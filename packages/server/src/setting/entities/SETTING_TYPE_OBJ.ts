export const SETTING_TYPE_OBJ = {
  hospitalName: 'Hospital Name',
  containerSnapshotIntervalMin: 'Container Snapshot Interval Minute',
  humidityThreshold: 'Humidity Threshold',
  temperatureThreshold: 'Temperature Threshold',
  trayLocationBlinkingSec: 'Tray Location Blinking Second',
} as const;

export type SETTING_TYPE_VALUES = keyof typeof SETTING_TYPE_OBJ;
export type SETTING_TYPE_LABELS =
  (typeof SETTING_TYPE_OBJ)[SETTING_TYPE_VALUES];

interface SettingLocationOptionType {
  value: SETTING_TYPE_VALUES;
  label: SETTING_TYPE_LABELS;
}

export const settingTypeOptions: SettingLocationOptionType[] = Object.keys(
  SETTING_TYPE_OBJ,
).map((key) => ({
  value: key as SETTING_TYPE_VALUES,
  label: SETTING_TYPE_OBJ[key],
}));
