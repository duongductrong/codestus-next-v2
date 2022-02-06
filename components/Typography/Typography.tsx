import React, { FC } from "react";
import classNames from "classnames";
import { AtomicComponent } from "../../@types/global/Common";
import { FaHashtag } from "react-icons/fa";

export interface TypographyProps extends AtomicComponent {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

  focusId?: boolean;
}

const Typography: FC<TypographyProps> = ({
  tagName = "h1",
  variant = "h1",
  className,
  focusId = false,
  children,
  ...props
}) => {
  const MyComponentType: any = tagName;

  const _variant = {
    "text-5xl": variant === "h1",
    "text-4xl": variant === "h2",
    "text-3xl": variant === "h3",
    "text-2xl": variant === "h4",
    "text-xl": variant === "h5",
    "text-lg": variant === "h6",
    "text-md": variant === "p",
  };

  const _focusId = focusId ? "flex items-center" : "";

  return (
    <MyComponentType {...props} className={classNames(_variant, _focusId, className)}>
      {focusId && (
        <a href={props.id} className="mr-2 inline-block p-2 hover:bg-gray-600/5 rounded-lg cursor-pointer">
          <FaHashtag className="text-md" />
        </a>
      )}
      {children}
    </MyComponentType>
  );
};

Typography.defaultProps = {
  tagName: "div",
};

export default Typography;
