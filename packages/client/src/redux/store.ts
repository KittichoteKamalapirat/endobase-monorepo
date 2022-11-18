import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import alertModalReducer from "./slices/alertModalReducer";
import saveCountReducer from "./slices/saveCountReducer";

const store = configureStore({
  reducer: {
    alertModal: alertModalReducer,
    saveCount: saveCountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

export default store;
