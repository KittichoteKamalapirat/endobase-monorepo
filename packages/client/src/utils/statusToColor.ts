// share this with backend

export type ValueOf<T> = T[keyof T];

export const ENDO_STATUS = {
  READY: "ready",
  EXPIRE_SOON: "expire_soon",
  taken_out: "taken_out",
  BEING_USED: "being_used",
  IN_WASHING_ROOM: "in_washing_room",
  EXPIRED: "expired",
  EXPIRED_AND_OUT: "expired_and_out",
  PREWASHED: "prewashed",
  LEAK_TEST_FAILED: "leak_test_failed",
  LEAK_TEST_PASSED: "leak_test_passed",
  DISINFECTION_PASSED: "disinfection_passed",
  DISINFECTION_FAILED: "disinfection_failed",
  DRYING: "drying",
  OUT_OF_ORDER: "out_of_order",
  FIXED: "fixed",
  FIXED_AND_OUT: "fixed_and_out", // for "take out and wash"
} as const;

export type ENDO_STATUS_Keys = keyof typeof ENDO_STATUS;
export type ENDO_STATUS_VALUES = typeof ENDO_STATUS[ENDO_STATUS_Keys]; //  "myValue1" | "myValue2"

export const statusToColor: Record<ENDO_STATUS_VALUES, string> = {
  [ENDO_STATUS.READY]: "green",
  [ENDO_STATUS.EXPIRE_SOON]: "orange",
  [ENDO_STATUS.taken_out]: "black",
  [ENDO_STATUS.BEING_USED]: "black",
  [ENDO_STATUS.IN_WASHING_ROOM]: "black",
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
  [ENDO_STATUS.FIXED_AND_OUT]: "black",
  
};

export const statusToBgColor: Record<ENDO_STATUS_VALUES, string> = {
  [ENDO_STATUS.READY]: "bg-green-bg",
  [ENDO_STATUS.EXPIRE_SOON]: "bg-yellow-bg",
  [ENDO_STATUS.taken_out]: "bg-grey-50",
  [ENDO_STATUS.BEING_USED]: "bg-grey-50",
  [ENDO_STATUS.IN_WASHING_ROOM]: "bg-grey-50",
  [ENDO_STATUS.EXPIRED_AND_OUT]: "bg-red-bg",
  [ENDO_STATUS.EXPIRED]: "bg-red-bg",
  [ENDO_STATUS.PREWASHED]: "bg-grey-50",
  [ENDO_STATUS.LEAK_TEST_FAILED]: "bg-grey-50",
  [ENDO_STATUS.LEAK_TEST_PASSED]: "bg-grey-50",
  [ENDO_STATUS.DISINFECTION_PASSED]: "bg-grey-50",
  [ENDO_STATUS.DISINFECTION_FAILED]: "bg-grey-50",
  [ENDO_STATUS.DRYING]: "bg-blue-bg",
  [ENDO_STATUS.OUT_OF_ORDER]: "bg-grey-0",
  [ENDO_STATUS.FIXED]: "bg-[#FFF1F5]", // pink
  [ENDO_STATUS.FIXED_AND_OUT]: "bg-[#FFF1F5]", // pink
};
