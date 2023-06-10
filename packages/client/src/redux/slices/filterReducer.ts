import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// if pageIndex === -1 => show every
export interface Filter {
  pageIndex: number; // container index
}

const initialState: Filter = {
  pageIndex: 0,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<Filter>) => {
      state.pageIndex = action.payload.pageIndex;
    },
  },
});

export const { updateFilter } = filterSlice.actions;

export default filterSlice.reducer;
