// share this with backend

export type ValueOf<T> = T[keyof T];

export const ENDO_STATUS = {
  READY: "ready",
  EXPIRE_SOON: "expire_soon",
  BEING_USED: "being_used",
  EXPIRED: "expired",
  EXPIRED_AND_OUT: "expired_and_out",
  PREWASHED: "prewashed",
  LEAK_TEST_FAILED: "leak_test_failed",
  LEAK_TEST_PASSED: "leak_test_passed",
  DISINFECTION_PASSED: "disinfection_passed",
  DISINFECTION_FAILED: "disinfection_failed",
  DRYING: "drying",
  OUT_OF_ORDER: "out_of_order",
  FIXED: "fixed"
} as const;

export type ENDO_STATUS_Keys = keyof typeof ENDO_STATUS;
export type ENDO_STATUS_VALUES = typeof ENDO_STATUS[ENDO_STATUS_Keys]; //  "myValue1" | "myValue2"

export const statusToColor: Record<ENDO_STATUS_VALUES, string> = {
  [ENDO_STATUS.READY]: "green",
  [ENDO_STATUS.EXPIRE_SOON]: "orange",
  [ENDO_STATUS.BEING_USED]: "black",
  [ENDO_STATUS.EXPIRED]: "red",
  [ENDO_STATUS.EXPIRED_AND_OUT]: "red",
  [ENDO_STATUS.PREWASHED]: "black",
  [ENDO_STATUS.LEAK_TEST_FAILED]: "black",
  [ENDO_STATUS.LEAK_TEST_PASSED]: "black",
  [ENDO_STATUS.DISINFECTION_PASSED]: "black",
  [ENDO_STATUS.DISINFECTION_FAILED]: "black",
  [ENDO_STATUS.DRYING]: "blue",
  [ENDO_STATUS.OUT_OF_ORDER]: "black",
  [ENDO_STATUS.FIXED]: "black",
  
};

export const statusToBgColor: Record<ENDO_STATUS_VALUES, string> = {
  [ENDO_STATUS.READY]: "bg-green-bg",
  [ENDO_STATUS.EXPIRE_SOON]: "bg-yellow-bg",
  [ENDO_STATUS.BEING_USED]: "bg-grey-50",
  [ENDO_STATUS.EXPIRED_AND_OUT]: "bg-red-bg",
  [ENDO_STATUS.EXPIRED]: "bg-red-bg",
  [ENDO_STATUS.PREWASHED]: "bg-grey-50",
  [ENDO_STATUS.LEAK_TEST_FAILED]: "bg-grey-50",
  [ENDO_STATUS.LEAK_TEST_PASSED]: "bg-grey-50",
  [ENDO_STATUS.DISINFECTION_PASSED]: "bg-grey-50",
  [ENDO_STATUS.DISINFECTION_FAILED]: "bg-grey-50",
  [ENDO_STATUS.DRYING]: "bg-blue-bg",
  [ENDO_STATUS.OUT_OF_ORDER]: "bg-grey-0",
  [ENDO_STATUS.FIXED]: "ffc2d1", // pink
};
