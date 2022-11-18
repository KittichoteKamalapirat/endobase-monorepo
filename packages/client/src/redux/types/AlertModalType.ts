export type AlertType = "success" | "warning" | "danger";

export interface AlertModalType {
  heading: string;
  content: string;
  type: AlertType;
  ariaLabel: string;
}
