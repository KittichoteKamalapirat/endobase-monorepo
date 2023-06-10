import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ENDO_STATUS_VALUES } from "../../utils/statusToColor";

// if pageIndex === -1 => show every
export interface Filter {
  pageIndex: number; // container index
  status: ENDO_STATUS_VALUES | "";
}

const initialState: Filter = {
  pageIndex: 0,
  status: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<Partial<Filter>>) => {
      const { pageIndex, status } = action.payload;
      // check type number pageIndex could be 0 (falsy)
      if (typeof pageIndex === "number") state.pageIndex = pageIndex;
      // check undefined because "" could be falsy
      if (typeof status !== "undefined") {
        // toggle of
        if (status === state.status) state.status = "";
        else state.status = status;
      }
    },
  },
});

export const { updateFilter } = filterSlice.actions;

export default filterSlice.reducer;
