import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertModalType } from "../types/AlertModalType";

export interface AlertModalState {
  data: AlertModalType;
  isOpen: boolean;
}

const blankAlertModal: AlertModalType = {
  heading: "Default Heading",
  content: "Default Content",
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
      state.data = action.payload;
      state.isOpen = !state.isOpen;
      // return action.payload;
    },
    closeAlertModal: (state) => {
      state.isOpen = false;
    },
    openAlertModal: (state, action: PayloadAction<AlertModalType>) => {
      state.data = action.payload;
      state.isOpen = true
    },
  },
});

export const { toggleAlertModal, closeAlertModal, openAlertModal } =
  alertModalSlice.actions;

export default alertModalSlice.reducer;
