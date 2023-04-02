export const ACTION_TYPE_OBJ = {
  bring_to_washing_room: "Bring to Washing oom",
  leak_test_and_prewash: "Leak Test and Prewash",
  take_out: "Take Out",
  disinfect: "Disinfect",
  store: "Put Back to Storage",
  
} as const;

export type ACTION_TYPE_VALUES = keyof typeof ACTION_TYPE_OBJ;
export type ACTION_TYPE_LABELS = typeof ACTION_TYPE_OBJ[ACTION_TYPE_VALUES];

interface ContainerTabOption {
  value: ACTION_TYPE_VALUES;
  label: ACTION_TYPE_LABELS;
}
export const serviceTypeOptions: ContainerTabOption[] = Object.keys(
  ACTION_TYPE_OBJ
).map((key) => ({
  value: key as ACTION_TYPE_VALUES,
  label: ACTION_TYPE_OBJ[key as ACTION_TYPE_VALUES],
}));
