// share this with backend

export type ValueOf<T> = T[keyof T];

export const ENDO_STATUS = {
  READY: "ready",
  EXPIRE_SOON: "expire_soon",
  BEING_USED: "being_used",
  EXPIRED: "expired",
  PREWASHED: "prewashed",
  LEAK_TEST_FAILED: "leak_test_failed",
  LEAK_TEST_PASSED: "leak_test_passed",
  DISINFECTED: "disinfected",
  DRYING: "drying",
} as const;

export type ENDO_STATUS_Keys = keyof typeof ENDO_STATUS;
export type ENDO_STATUS_VALUES = typeof ENDO_STATUS[ENDO_STATUS_Keys]; //  "myValue1" | "myValue2"

export const statusToColor = {
  [ENDO_STATUS.READY]: "green",
  [ENDO_STATUS.EXPIRE_SOON]: "orange",
  [ENDO_STATUS.BEING_USED]: "black",
  [ENDO_STATUS.EXPIRED]: "red",
  [ENDO_STATUS.PREWASHED]: "black",
  [ENDO_STATUS.LEAK_TEST_FAILED]: "black",
  [ENDO_STATUS.LEAK_TEST_PASSED]: "black",
  [ENDO_STATUS.DISINFECTED]: "black",
  [ENDO_STATUS.DRYING]: "blue",
};
