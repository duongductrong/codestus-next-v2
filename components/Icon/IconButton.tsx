import classNames from "classnames";
import React, { Children, cloneElement, FC } from "react";
import { AtomicComponent } from "../../@types/global/Common";

export interface IconButtonProps extends AtomicComponent {}

const IconButton: FC<IconButtonProps> = ({ className, children, ...props }) => {
  return (
    <div
      {...props}
      className={classNames(
        "w-11 h-11 rounded-full bg-blue-50 hover:bg-blue-100 transition-all duration-300 inline-flex items-center justify-center cursor-pointer",
        className
      )}>
      {Children.only(cloneElement(children as any, { className: "text-blue-500" }))}
    </div>
  );
};

export default IconButton;
