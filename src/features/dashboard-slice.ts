import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../lib/config";
type state = {
  leaderboards: {
    contribution: ContributionLeaderboardType;
    task: TaskLeaderboardType;
    expenses: ExpenseLeaderboardType;
  };
};

const initialState: state = {
  leaderboards: {
    contribution: [],
    task: {
      pending: [],
      missed: [],
      completed: [],
    },
    expenses: [],
  },
};

export const fetchContributionLeaderboard = createAsyncThunk(
  "dashboard/leaderboard/contribution",
  async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const response = await fetch(`${API_URL}/api/leaderboard/contribution`, {
      headers: {
        Authorization: `Bearer ${token} `,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return;
    }
    return (await response.json()) as ContributionLeaderboardType;
  },
);
export const fetchTaskLeaderboard = createAsyncThunk(
  "dashboard/leaderboard/task",
  async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const response = await fetch(`${API_URL}/api/leaderboard/task`, {
      headers: {
        Authorization: `Bearer ${token} `,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return;
    }
    return (await response.json()) as TaskLeaderboardType;
  },
);
export const fetchExpenseLeaderboard = createAsyncThunk(
  "dashboard/leaderboard/expense",
  async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const response = await fetch(`${API_URL}/api/leaderboard/expense`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return;
    }
    return (await response.json()) as ExpenseLeaderboardType;
  },
);
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContributionLeaderboard.fulfilled, (state, action) => {
        if (!action.payload) {
          console.log("Failed to fetch Contribution Leaderboard");
          return;
        }
        state.leaderboards.contribution = action.payload;
      })
      .addCase(fetchTaskLeaderboard.fulfilled, (state, action) => {
        if (!action.payload) {
          console.log("pending tasks not received");
          return;
        }
        state.leaderboards.task = action.payload;
      })
      .addCase(fetchExpenseLeaderboard.fulfilled, (state, action) => {
        if (!action.payload) {
          console.log("Failed to fetch Expense Leaderboard");
          return;
        }
        state.leaderboards.expenses = action.payload;
      });
  },
});
export const dashboardReducer = dashboardSlice.reducer;
