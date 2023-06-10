import { ENDO_STATUS, ENDO_STATUS_VALUES } from "./statusToColor";

// match withEndoStatusTable2 Component
export const filterEndoByStatus = (
  status: ENDO_STATUS_VALUES,
  activeStatus: ENDO_STATUS_VALUES | ""
) => {
  // Ready
  if (
    activeStatus === "ready" &&
    (status === ENDO_STATUS.READY || status === ENDO_STATUS.DRYING)
  )
    return true;

  // Selected
  if (activeStatus === "selected" && status === "selected") return true;

  // Being Used
  if (activeStatus === "being_used" && status === "being_used") return true;

  // In Washing Room
  if (activeStatus === "in_washing_room" && status === "in_washing_room")
    return true;

  // Leak Tested
  if (
    activeStatus === "leak_test_passed" &&
    (status === "leak_test_passed" || status === "leak_test_failed")
  )
    return true;

  // Disinfected
  if (
    activeStatus === "disinfection_passed" &&
    (status === "disinfection_passed" || status === "disinfection_failed")
  )
    return true;

  // Expire Soon
  if (activeStatus === "expire_soon" && status === "expire_soon") return true;

  // Expired
  if (
    activeStatus === "expired" &&
    (status === "expired" || status === "expired_and_out")
  )
    return true;

  // Out of Order
  if (activeStatus === "out_of_order" && status === "out_of_order") return true;

  // Fixed
  if (
    activeStatus === "fixed" &&
    (status === "fixed" || status === "fixed_and_out")
  )
    return true;

  return false;
};
