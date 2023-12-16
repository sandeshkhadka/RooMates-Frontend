import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../lib/config";
type ContributionState = {
  entities: ContributionType[];
};
type FetchApiResponse = {
  contributions: ContributionType[];
};
type PostApiResponse = {
  contribution: ContributionType;
};
type DeleteApiResponse = {
  deleted: ContributionType;
};
export type DraftContribution = RequireOnly<
  ContributionType,
  "name" | "type" | "amount"
>;
export const fetchContribution = createAsyncThunk(
  "contribution/fetch",
  async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await fetch(`${API_URL}/api/contribution`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const responseObj = (await response.json()) as FetchApiResponse;
      return responseObj.contributions;
    } catch (e) {
      console.log(e);
      return;
    }
  },
);

export const postContribution = createAsyncThunk(
  "contribution/post",
  async (draft: DraftContribution) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await fetch(`${API_URL}/api/contribution`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(draft),
      });
      if (!response.ok) {
        return;
      }
      console.log("here");
      const responseObj = (await response.json()) as PostApiResponse;
      return responseObj.contribution;
    } catch (e) {
      console.log(e);
    }
  },
);

export const deleteContribution = createAsyncThunk(
  "contribution/delete",
  async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await fetch(`${API_URL}/api/contribution/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        return;
      }
      console.log("ok");
      const responseObj = (await response.json()) as DeleteApiResponse;
      console.log(responseObj);
      console.log(responseObj.deleted);
      return responseObj.deleted;
    } catch (e) {
      console.log(e);
    }
  },
);

const initialState: ContributionState = {
  entities: [],
};
const contributionSlice = createSlice({
  name: "contribution",
  initialState,
  reducers: {
    addContribution: (state, action: PayloadAction<ContributionType>) => {
      state.entities.push(action.payload);
    },
    removeContribution: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.entities.findIndex(
        (contribution) => contribution.id === id,
      );
      console.log("i got here bay");
      state.entities.splice(index, 1);
      console.log(state.entities);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContribution.fulfilled, (state, action) => {
      const contributions = action.payload;
      if (!contributions) return;
      state.entities = contributions;
    });
    builder.addCase("auth/logOut", (state) => {
      state.entities = [];
    });
    builder.addCase(postContribution.fulfilled, (state, action) => {
      const contribution = action.payload;
      if (!contribution) return;
      contributionSlice.caseReducers.addContribution(
        state,
        contributionSlice.actions.addContribution(contribution),
      );
    });
    builder.addCase(deleteContribution.fulfilled, (state, action) => {
      const contribution = action.payload;
      if (!contribution) return;
      const id = contribution.id;
      if (!id) return;
      contributionSlice.caseReducers.removeContribution(
        state,
        contributionSlice.actions.removeContribution(id),
      );
    });
  },
});

export const contributionReducer = contributionSlice.reducer;
// export {} = contributionSlice.actions;
