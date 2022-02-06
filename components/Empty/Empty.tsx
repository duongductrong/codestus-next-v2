import classNames from "classnames";
import React, { FC } from "react";
import { FaBoxOpen } from "react-icons/fa";
import { AtomicComponent } from "../../@types/global/Common";
import Typography from "../Typography/Typography";

export interface EmptyProps extends AtomicComponent {
  name?: string;
}

const Empty: FC<EmptyProps> = ({ className, name, ...props }) => {
  return (
    <div {...props} className={classNames("text-center py-8", className)}>
      <FaBoxOpen size={80} className="mx-auto text-slate-300" />
      <Typography variant="p" tagName="p" className="font-semibold text-slate-400">
        {name ?? "Not found anymore items."}
      </Typography>
    </div>
  );
};

export default Empty;
