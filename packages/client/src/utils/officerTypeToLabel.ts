export const OFFICER_TYPE_OBJ = {
  hos_officer: "Hospital Officer",
  endo_technician: "Endoscope Technician",
} as const;

export type OFFICER_TYPE_VALUES = keyof typeof OFFICER_TYPE_OBJ;
export type OFFICER_TYPE_LABELS =
  (typeof OFFICER_TYPE_OBJ)[OFFICER_TYPE_VALUES];

interface OfficerOption {
  value: OFFICER_TYPE_VALUES;
  label: OFFICER_TYPE_LABELS;
}
export const officerTypeOptions: OfficerOption[] = Object.keys(
  OFFICER_TYPE_OBJ
).map((key) => ({
  value: key as OFFICER_TYPE_VALUES,
  label: OFFICER_TYPE_OBJ[key as OFFICER_TYPE_VALUES],
}));
