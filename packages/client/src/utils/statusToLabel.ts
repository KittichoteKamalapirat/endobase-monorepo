import { ENDO_STATUS_VALUES } from "./statusToColor";

// Have to sync with endoActionColumn
export const statusToLabel: Record<ENDO_STATUS_VALUES, string> = {
  ready: "Ready", // action = "Pick"
  expire_soon: "Expire Soon", // action = "Pick"
  selected: "Selected", // action = "Take out"
  being_used: "Being Used", // action = "Bring to Washing Room"
  in_washing_room: "In a washing room", // action = "Leak Test"
  expired: "Expired", // action = "Take out and wash"
  expired_and_out: "Expired and Took Out", // action = "Take out"
  prewashed: "Prewashed",
  leak_test_failed: "Leak Test Failed", // action = "Leak Test"
  leak_test_passed: "Leak Test Passed", // action = "Disinfect"
  disinfection_passed: "Disinfection Passed", // action = "Store"
  disinfection_failed: "Disinfection Failed", // action = "Disinfect"
  drying: "Drying", // display text = "Drying"
  out_of_order: "Out of order", // action = "Finished repairing"
  fixed: "Fixed", // action = "Take out and wash"
  fixed_and_out: "Fixed and Took Out", // action = "Take out"
};

// ready =>
// selected =>
// being_used
