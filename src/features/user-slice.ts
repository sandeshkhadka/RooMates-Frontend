import { createSlice } from "@reduxjs/toolkit";
import { dummyUserResponse } from "../assets/data";
type UserState = {
  self: User;
  friends: User[];
};
const initialState: UserState = {
  self: {
    id: "abcd",
    username: "admin",
    tasks: [],
  },
  friends: dummyUserResponse.users,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const userReducer = userSlice.reducer;
