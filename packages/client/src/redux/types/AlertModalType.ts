import { ReactNode } from "react";

export type AlertType = "success" | "warning" | "danger";

export interface AlertModalType {
  heading: string;
  content: string | ReactNode;
  type: AlertType;
  ariaLabel: string;
  actionsType?: "containerSnapshot";
}
