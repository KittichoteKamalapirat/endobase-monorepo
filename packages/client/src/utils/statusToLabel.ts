import { ENDO_STATUS_VALUES } from "./statusToColor";

export const statusToLabel: Record<ENDO_STATUS_VALUES, string> = {

    ready: "Ready",
   expire_soon: "Expire Soon",
   taken_out: "Took Out",
   being_used: "Being Used",
   in_washing_room: "In a washing room",
   expired: "Expired",
   expired_and_out: "Expired and Took Out",
   prewashed: "Prewashed",
   leak_test_failed: "Leak Test Failed",
   leak_test_passed: "Leak Test Passed",
   disinfection_passed: "Disinfection Passed",
   disinfection_failed: "Disinfection Failed",
   drying: "Drying",
   out_of_order: "Out of order",
   fixed: "Fixed",
   fixed_and_out: "Fixed and Took Out",
}