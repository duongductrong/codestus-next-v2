import classNames from "classnames";
import React, { FC, ReactNode } from "react";
import { ColorType } from "../../@types/global/Color";
import { AtomicComponent } from "../../@types/global/Common";

export interface ButtonProps extends AtomicComponent {
  size?: "sm" | "md" | "lg" | "none";
  color?: ColorType | "white" | "none";

  beforeIcon?: FC | ReactNode;
  afterIcon?: FC | ReactNode;
}

const Button: FC<ButtonProps> = ({
  color = "primary",
  size = "md",
  className,
  tagName = "button",
  children,
  beforeIcon,
  afterIcon,
  ...props
}) => {
  // defined style color for button
  const _color =
    color === "primary"
      ? "bg-blue-600 hover:bg-blue-700 ring-blue-600 text-gray-50"
      : color === "secondary"
      ? "bg-slate-600 hover:bg-slate-700 ring-slate-600 text-gray-50"
      : color === "white"
      ? "bg-white shadow-sm border border-slate-300 ring-slate-900"
      : "";

  // defined style size for button
  const _size =
    size === "sm"
      ? "px-4 py-1 text-sm"
      : size === "md"
      ? "px-4 py-2 text-sm"
      : size === "lg"
      ? "px-6 py-2 text-md"
      : "";

  // Defined default if rounded-* exist in className then not set "rounded-md" default
  const _rounded = !className?.match(/rounded-*/g)?.length ? "rounded-md" : "";

  // defined default tagName button
  const ButtonComponent: any = tagName ?? "button";

  return (
    <ButtonComponent
      {...props}
      className={classNames(
        _color,
        _size,
        _rounded,
        "inline-flex items-center focus:ring-2 ring-offset-2 subpixel-antialiased transition-all duration-300",
        className
      )}>
      {beforeIcon}
      {children}
      {afterIcon}
    </ButtonComponent>
  );
};

Button.defaultProps = {
  tagName: "button",
};

export default Button;
