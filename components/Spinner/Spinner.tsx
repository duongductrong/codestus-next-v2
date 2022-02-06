import classNames from "classnames";
import React, { FC } from "react";
import { AtomicComponent } from "../../@types/global/Common";

export interface SpinnerProps extends AtomicComponent {
  size?: "sm" | "md" | "lg";
}

const Spinner: FC<SpinnerProps> = ({ tagName = "div", size = "md", className, ...props }) => {
  const Component: any = tagName;
  const _size = size === "sm" ? "w-5 h-5" : size === "md" ? "w-8 h-8" : size === "lg" ? "w-10 h-10" : "";
  return (
    <Component
      {...props}
      className={classNames(
        "animate-spin border-2 border-gray-200 border-r-2 border-r-blue-600 rounded-full",
        _size,
        className
      )}></Component>
  );
};

export default Spinner;
