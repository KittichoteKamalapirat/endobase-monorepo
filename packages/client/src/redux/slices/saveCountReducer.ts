import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UPDATE_CONTAINER_STATS_TIME_INTERVAL } from "../../constants";

const initialState = UPDATE_CONTAINER_STATS_TIME_INTERVAL * 60; // can also be the  UPDATE_STORAGE_TIME_INTERVAL

export const saveCountSlice = createSlice({
  name: "saveCount",
  initialState,
  reducers: {
    updateSaveCount: (state, action: PayloadAction<number>) => {
      state = action.payload;
      return action.payload;
    },
  },
});

export const { updateSaveCount } = saveCountSlice.actions;

export default saveCountSlice.reducer;
