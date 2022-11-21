import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConfirmModalType } from "../types/ConfirmModalType";

export interface ConfirmState {
  data: ConfirmModalType;
  isOpen: boolean;
}

const blankConfirm: ConfirmModalType = {
  heading: "Default Heading",
  content: "Default Content",
  toPerform: null,
  ariaLabel: "",
  type: "danger",
};

const initialState: ConfirmState = {
  data: blankConfirm,
  isOpen: false,
};

export const ConfirmSlice = createSlice({
  name: "Confirm",
  initialState,
  reducers: {
    toggleConfirm: (state, action: PayloadAction<ConfirmModalType>) => {
      state.data = action.payload;
      state.isOpen = !state.isOpen;
      // return action.payload;
    },
    closeConfirm: (state) => {
      state.isOpen = false;
    },
    openConfirm: (state, action: PayloadAction<ConfirmModalType>) => {
      state.data = action.payload;
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleConfirm, closeConfirm, openConfirm } =
  ConfirmSlice.actions;

export default ConfirmSlice.reducer;
