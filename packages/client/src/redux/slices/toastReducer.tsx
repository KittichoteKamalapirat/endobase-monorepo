import { BsFillCheckCircleFill } from "react-icons/bs";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { BiCheck } from "react-icons/bi";
import classNames from "classnames";
import toast from "react-hot-toast";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICON_SIZE } from "../../constants";

interface Toast {
  message: string;
  variant: "success" | "warning" | "error";
}

export interface ToastsState {
  toasts: Toast[];
}

export const toastSlice = createSlice({
  name: "toast",
  initialState: [] as Toast[],
  reducers: {
    showToast: (state, action: PayloadAction<Toast>) => {
      const { variant, message } = action.payload;
      switch (variant) {
        case "success":
          toast.custom(
            (t) => (
              <div
                className={classNames(
                  "data-testid-toast-success bg-green-50 mb-2 flex items-center space-x-2 rounded-md py-2 px-12 font-bold text-green-500 shadow-md",
                  t.visible && "animate-fade-in-up"
                )}
              >
                <BsFillCheckCircleFill size={ICON_SIZE + 4} />
                <p>{message}</p>
              </div>
            ),
            { duration: 3000, position: "bottom-center" }
          );
          break;
        case "error":
          toast.custom(
            (t) => (
              <div
                className={classNames(
                  "animate-fade-in-up mb-2 flex items-center space-x-2 rounded-md bg-red-100 py-2 px-12 font-bold text-red-900 shadow-md",
                  t.visible && "animate-fade-in-up"
                )}
              >
                <HiOutlineInformationCircle className="h-4 w-4" />
                <p>{message}</p>
              </div>
            ),
            { duration: 3000 }
          );
          break;
        case "warning":
          toast.custom(
            (t) => (
              <div
                className={classNames(
                  "animate-fade-in-up bg-grey-800 mb-2 flex items-center space-x-2 rounded-md py-2 px-12 font-bold text-grey-0 shadow-md",
                  t.visible && "animate-fade-in-up"
                )}
              >
                <HiOutlineInformationCircle className="h-4 w-4" />
                <p>{message}</p>
              </div>
            ),
            { duration: 3000 }
          );
          break;
        default:
          toast.custom(
            (t) => (
              <div
                className={classNames(
                  "animate-fade-in-up bg-grey-800 mb-2 flex items-center space-x-2 rounded-md py-2 px-12 font-bold text-grey-0 shadow-md",
                  t.visible && "animate-fade-in-up"
                )}
              >
                <BsFillCheckCircleFill size={ICON_SIZE + 4} />
                <p>{message}</p>
              </div>
            ),
            { duration: 3000 }
          );
          break;
      }
    },
  },
});

export const { showToast } = toastSlice.actions;

export default toastSlice.reducer;
