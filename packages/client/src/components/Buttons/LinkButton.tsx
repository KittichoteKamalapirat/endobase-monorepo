import React from "react";
import { Link } from "react-router-dom";
import Button, { ButtonProps, ButtonTypes, HTMLButtonType } from "./Button";

interface Props extends ButtonProps {
  label: string;
  pathname?: string;
  href: any;
}

const LinkButton = ({
  label,
  href,
  pathname,

  ...rest
}: Props) => {
  return (
    <Link to={href || { pathname }}>
      <Button label={label} {...rest} />
    </Link>
  );
};

LinkButton.defaultProps = {
  type: ButtonTypes.PRIMARY,
  spacing: "px-5.5",
  height: "h-7.75",
  extraClass: "",
  href: "",
  buttonType: HTMLButtonType.BUTTON,
  disabled: false,
  borderRadius: "rounded-5px",
  borderColour: "border-primary-primary",
  borderWidth: "border",
  fontSize: "text-13px",
  fontColor: "text-primary-primary",
};

export default LinkButton;
