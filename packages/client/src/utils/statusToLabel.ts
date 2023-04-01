import { ENDO_STATUS_VALUES } from "./statusToColor";

export const statusToLabel: Record<ENDO_STATUS_VALUES, string> = {

    ready: "Ready",
   expire_soon: "Expire Soon",
   being_used: "Being Used",
   expired: "Expired",
   expired_and_out: "Expired And Out",
   prewashed: "Prewashed",
   leak_test_failed: "Leak Test Failed",
   leak_test_passed: "Leak Test Passed",
   disinfection_passed: "Disinfection Passed",
   disinfection_failed: "Disinfection Failed",
   drying: "Drying",
   being_fixed: "Not Ready",
}