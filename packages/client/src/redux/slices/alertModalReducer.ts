import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertModalType } from "../types/AlertModalType";

export interface AlertModalState {
  data: AlertModalType;
  isOpen: boolean;
}

const blankAlertModal: AlertModalType = {
  heading: "",
  content: "",
  type: "success",
  ariaLabel: "",
};

const initialState: AlertModalState = {
  data: blankAlertModal,
  isOpen: false,
};

export const alertModalSlice = createSlice({
  name: "alertModal",
  initialState,
  reducers: {
    toggleAlertModal: (state, action: PayloadAction<AlertModalType>) => {
      console.log("action payload", action.payload);
      state.data = action.payload;
      state.isOpen = !state.isOpen;
      // return action.payload;
    },
    closeAlertModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggleAlertModal, closeAlertModal } = alertModalSlice.actions;

export default alertModalSlice.reducer;
