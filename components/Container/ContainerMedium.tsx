import classNames from "classnames";
import React, { FC } from "react";
import { AtomicComponent } from "../../@types/global/Common";

export interface ContainerMediumProps extends AtomicComponent<HTMLDivElement> {}

const ContainerMedium: FC<ContainerMediumProps> = ({ className, children, style, ...props }) => {
  return (
    <div {...props} style={{ ...style, maxWidth: "968px" }} className={classNames("mx-auto px-4", className)}>
      {children}
    </div>
  );
};

export default ContainerMedium;
