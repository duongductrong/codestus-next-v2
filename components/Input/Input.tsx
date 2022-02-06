import classNames from "classnames";
import React, { FC, ReactNode } from "react";
import { AtomicComponent } from "../../@types/global/Common";
import Spinner from "../Spinner/Spinner";

export interface InputProps extends AtomicComponent<HTMLInputElement> {
  containerClassName?: string;
  beforeIcon?: FC | ReactNode | JSX.Element | JSX.IntrinsicElements;
  fullWidth?: boolean;
  loading?: boolean;
  size?: "md" | "lg";
}

const Input: FC<InputProps> = ({
  containerClassName,
  className,
  beforeIcon,
  fullWidth = false,
  loading = false,
  size = "md",
  ...props
}) => {
  const _rounded = !className?.match(/rounded-*/g)?.length ? "rounded-md" : "";
  const _size =
    // Has not icon
    size === "md" && !beforeIcon
      ? "px-4 py-2"
      : size === "lg" && !beforeIcon
      ? "px-4 py-3"
      : /**
       * Has icon
       */
      size === "md" && beforeIcon
      ? "pr-4 pl-9 py-2"
      : size === "lg" && beforeIcon
      ? "pr-4 pl-9 py-3"
      : "";
  // const _hasIcon = beforeIcon ? "pr-4 pl-9 py-2" : _size;
  const _computedClassNameContainer =
    !containerClassName?.match(/inline-*|flex|block/g)?.length && !fullWidth ? "inline-block" : containerClassName;
  const _fullWidth = fullWidth ? "block w-full" : "";

  return (
    <div className={classNames("relative", _computedClassNameContainer, _fullWidth)}>
      {beforeIcon &&
        React.cloneElement(beforeIcon as any, {
          className: "mr-2 absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 pointer-events-none",
        })}
      <input
        {...props}
        className={classNames(
          "w-full text-sm placeholder:text-sm border focus:border-blue-600 focus:ring-2 ring-blue-600 ring-offset-2 outline-0 transition-all duration-300",
          _rounded,
          _size,
          className
        )}
      />

      {/* Loading */}
      {loading && (
        <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
          <Spinner size="sm" />
        </div>
      )}
    </div>
  );
};

export default Input;
