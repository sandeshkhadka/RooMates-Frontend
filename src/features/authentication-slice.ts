import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
type UserState = {
  id: string;
  username: string;
};
type AuthState = {
  token: string;
  user: UserState;
  loggedIn: boolean;
};
const initialState: Partial<AuthState> = {
  loggedIn: false,
};
type userCredintails = {
  username: string;
  password: string;
};
export const hydrateLogin = createAsyncThunk("auth/hydrate", async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const response = await fetch("http://127.0.0.1:3000/api/rehydrate", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user = (await response.json()) as UserState | { message: string };
  return user;
});
export const logIn = createAsyncThunk(
  "auth/login",
  async (userCreds: userCredintails) => {
    const url = "http://127.0.0.1:3000/signin";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCreds),
    });
    if (!response.ok) {
      return null;
    }
    if (response.status !== 200) {
      return null;
    }
    const state: AuthState = (await response.json()) as AuthState;
    return state;
  },
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOUt: (state) => {
      state.user = undefined;
      state.token = undefined;
      state.loggedIn = false;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, action) => {
      const auth = action.payload;
      if (!auth) {
        return;
      }
      state.loggedIn = true;
      state.user = auth.user;
      state.token = auth.token;
      localStorage.setItem("token", auth.token);
    });
    builder.addCase(hydrateLogin.fulfilled, (state, action) => {
      const user = action.payload;
      if (user === null) {
        return;
      }
      if ("message" in user) {
        console.log(user.message);
        return;
      }
      state.user = user;
      state.loggedIn = true;
    });
  },
});

export const authReducer = authSlice.reducer;
export const { logOUt } = authSlice.actions;
