import { createSlice } from "@reduxjs/toolkit";
import { dummyContriResponse } from "../assets/data";
type ContributionState = {
  entities: ContributionType[];
};
type DraftContribution = RequireOnly<
  ContributionType,
  "name" | "type" | "amount"
>;
const initialState: ContributionState = dummyContriResponse;
const contributionSlice = createSlice({
  name: "contribution",
  initialState,
  reducers: {},
});

export const contributionReducer = contributionSlice.reducer;
