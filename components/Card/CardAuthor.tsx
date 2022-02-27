/* eslint-disable @next/next/no-img-element */
import classNames from "classnames";
import React, { cloneElement, FC, ReactNode } from "react";
import { AtomicComponent } from "../../@types/global/Common";

export interface CardAuthorProps extends AtomicComponent {
  icon?: FC | ReactNode | JSX.Element | JSX.IntrinsicElements;
  src?: string;
  title?: string;
  description?: string;
}

const CardAuthor: FC<CardAuthorProps> = ({ title, description, className, icon, src, ...props }) => {
  return (
    <div
      {...props}
      className={classNames(
        "inline-flex items-center text-sm px-2 py-2 rounded-lg w-full transition-all duration-300",
        className
      )}>
      {src || icon ? (
        <div
          data-testid="avatar-test"
          className={classNames(
            "w-11 h-11 bg-blue-100 rounded-lg overflow-hidden mr-3 inline-flex items-center justify-center"
          )}>
          {src && <img src={src} alt={src} className="w-full h-full object-cover" />}
          {icon &&
            cloneElement(icon as any, {
              className: "text-lg text-blue-500",
            })}
        </div>
      ) : null}
      <div className="whitespace-nowrap">
        <b className="font-semibold">{title}</b>
        <p className="text-slate-500">{description}</p>
      </div>
    </div>
  );
};

export default CardAuthor;
