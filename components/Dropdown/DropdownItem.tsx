import classNames from "classnames";
import React, { FC } from "react";
import { AtomicComponent } from "../../@types/global/Common";

export interface DropdownItemProps extends AtomicComponent {}

const DropdownItem: FC<DropdownItemProps> = ({ className, children, ...props }) => {
  return (
    <div
      {...props}
      className={classNames("px-4 py-2 text-slate-700 hover:bg-gray-100 cursor-pointer text-sm", className)}>
      {children}
    </div>
  );
};

export default DropdownItem;
