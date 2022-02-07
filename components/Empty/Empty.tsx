import classNames from "classnames";
import React, { FC } from "react";
import { FaBoxOpen } from "react-icons/fa";
import { AtomicComponent } from "../../@types/global/Common";
import Typography from "../Typography/Typography";

export interface EmptyProps extends AtomicComponent {
  name?: string;

  iconSize?: "sm" | "md" | "lg" | "xl" | "2xl";
}

const Empty: FC<EmptyProps> = ({ iconSize = "md", className, name, ...props }) => {
  const _iconSize =
    iconSize === "sm"
      ? 56
      : iconSize === "md"
      ? 80
      : iconSize === "lg"
      ? 100
      : iconSize === "xl"
      ? 124
      : iconSize === "2xl"
      ? 148
      : "";
  return (
    <div {...props} className={classNames("text-center py-8", className)}>
      <FaBoxOpen size={_iconSize} className="mx-auto text-slate-300" />
      <Typography variant="p" tagName="p" className="text-slate-400">
        <span dangerouslySetInnerHTML={{ __html: name ?? "Not found anymore items." }}></span>
      </Typography>
    </div>
  );
};

export default Empty;
