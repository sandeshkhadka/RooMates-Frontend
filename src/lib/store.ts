import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/authentication-slice";
import { contributionReducer } from "../features/contribution-slice";
import { userReducer } from "../features/user-slice";
import { taskReducer } from "../features/tasks-slice";
import { chatReducer } from "../features/chat-slice";
import { dashboardReducer } from "../features/dashboard-slice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    contribution: contributionReducer,
    users: userReducer,
    tasks: taskReducer,
    chat: chatReducer,
    dashboard: dashboardReducer,
  },
});

export type ApplicationState = ReturnType<typeof store.getState>;
export type ApplicationDispatch = typeof store.dispatch;
export default store;
