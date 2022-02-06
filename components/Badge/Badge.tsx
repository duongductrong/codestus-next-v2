import classNames from "classnames";
import React, { FC } from "react";
import { ColorType } from "../../@types/global/Color";
import { AtomicComponent } from "../../@types/global/Common";

export interface BadgeProps extends AtomicComponent {
  color?: ColorType | "none";
}

const Badge: FC<BadgeProps> = ({ tagName = "span", className, children, color = "primary", ...props }) => {
  const Component: any = tagName;
  const _color =
    color === "primary" ? "bg-blue-100 text-blue-600" : color === "secondary" ? "bg-slate-100 text-slate-600" : "";
  return (
    <Component
      {...props}
      style={{ minWidth: "50px" }}
      className={classNames("px-3 py-1 font-medium rounded-full inline-block text-sm", _color, className)}>
      {children}
    </Component>
  );
};

export default Badge;
