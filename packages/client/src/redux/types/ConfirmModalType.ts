export type ConfirmType = "neutral" | "warning" | "danger";

export interface ConfirmModalType {
  heading: string; // Are you sure you want to delete an endoscope
  content: string; // Delete an endoscope cannot be undone
  toPerform: any;
  type: ConfirmType;
  ariaLabel: string;
}
