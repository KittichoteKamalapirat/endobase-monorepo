import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UPDATE_CLIENT_DATA_MINUTE_INTERVAL } from "../../constants";

const initialState = UPDATE_CLIENT_DATA_MINUTE_INTERVAL * 60;
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
