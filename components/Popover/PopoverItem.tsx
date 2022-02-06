import classNames from "classnames";
import { FC, ReactNode } from "react";
import { ColorType } from "../../@types/global/Color";
import { AtomicComponent } from "../../@types/global/Common";

export interface PopoverItemProps extends AtomicComponent {
  active?: boolean;

  color?: ColorType;

  beforeIcon?: ReactNode;
}

const PopoverItem: FC<PopoverItemProps> = ({
  active = false,
  color = "secondary",
  className,
  children,
  beforeIcon,

  ...props
}) => {
  const _activeClassName = active ? "bg-blue-50/50" : "";
  const _color = {
    wrapper: color === "primary" ? "hover:bg-blue-50/50" : color === "secondary" ? "hover:bg-blue-50/50" : "",
    icon: color === "primary" ? "bg-blue-300/50" : color === "secondary" ? "bg-blue-300/25" : "",
  };

  return (
    <div
      {...props}
      className={classNames(
        "inline-flex items-center text-sm px-2 py-2 rounded-lg cursor-pointer w-full transition-all duration-300",
        _activeClassName,
        _color.wrapper,
        className
      )}>
      {beforeIcon && (
        <div className={classNames("w-11 h-11 rounded-lg mr-3 inline-flex items-center justify-center", _color.icon)}>
          {beforeIcon}
        </div>
      )}
      <div className="whitespace-nowrap">{children}</div>
    </div>
  );
};

export default PopoverItem;
