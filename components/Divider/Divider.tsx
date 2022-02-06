import classNames from "classnames";
import React, { FC } from "react";
import { AtomicComponent } from "../../@types/global/Common";

export interface DividerProps extends AtomicComponent {}

const Divider: FC<DividerProps> = ({ className, style, ...props }) => {
  return (
    <div {...props} style={{ height: "2px", ...style }} className={classNames("w-full bg-gray-200", className)}></div>
  );
};

export default Divider;
