import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../lib/config";
import { useAuth } from "../lib/hooks";
type DistributionApiResponse = {
  byUser: {
    userId: string;
    amount: number;
  }[];
};
type PendingTaskApiResponse = {
  tasks: {
    userId: string;
    amount: number;
  }[];
};
type FriendState = {
  userId: string;
  amount: number;
};
type state = {
  contribution: {
    amount: number;
    friends: FriendState[];
  };
  pendingTaskNo: {
    amount: number;
    friends: FriendState[];
  };
};

const initialState: state = {
  contribution: { amount: 0, friends: [] },
  pendingTaskNo: { amount: 0, friends: [] },
};

export const fetchContributionDistribution = createAsyncThunk(
  "dashboard/distribution",
  async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const response = await fetch(`${API_URL}/api/contribution/distribution`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return;
    }
    return (await response.json()) as DistributionApiResponse;
  },
);
export const fetchPendingTasks = createAsyncThunk(
  "dashboard/pendingTasks",
  async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const response = await fetch(`${API_URL}/api/dashboard/task/pending`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return;
    }
    return (await response.json()) as PendingTaskApiResponse;
  },
);
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContributionDistribution.fulfilled, (state, action) => {
        if (!action.payload) {
          console.log("distribution not received");
          return;
        }
        const auth = useAuth();
        for (const entry of action.payload.byUser) {
          if (entry.userId == auth.user!.id) {
            state.contribution.amount = entry.amount;
          } else {
            state.contribution.friends.push(entry);
          }
        }
      })
      .addCase(fetchPendingTasks.fulfilled, (state, action) => {
        if (!action.payload) {
          console.log("pending tasks not received");
          return;
        }
        const auth = useAuth();
        for (const entry of action.payload.tasks) {
          if (entry.userId == auth.user!.id) {
            state.pendingTaskNo.amount = entry.amount;
          } else {
            state.pendingTaskNo.friends.push(entry);
          }
        }
      });
  },
});
export const dashboardReducer = dashboardSlice.reducer;
