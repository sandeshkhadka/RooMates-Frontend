import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { logOut } from "./authentication-slice";
// import { dummyUserResponse } from "../assets/data";
import { API_URL } from "../lib/config";

type UserState = {
  userList: User[];
};
type UserApiResponse = {
  users: User[];
};
export const fetchUsers = createAsyncThunk("user/fetch", async () => {
  const token = localStorage.getItem("token");
  if (!token) return;
  const response = await fetch(API_URL + "/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseObj = (await response.json()) as UserApiResponse;
  return responseObj.users;
});
const initialState: UserState = {
  userList: [],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      const users = action.payload;
      if (!users) return;
      state.userList = users;
    });
    builder.addCase("auth/logOut", (state) => {
      state.userList = [];
    });
  },
});

export const userReducer = userSlice.reducer;
