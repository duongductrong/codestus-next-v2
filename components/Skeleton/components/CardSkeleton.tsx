import classNames from "classnames";
import React, { FC } from "react";

export interface CardSkeletonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, ""> {
  bgTransparent?: boolean;
}

const CardSkeleton: FC<CardSkeletonProps> = ({ bgTransparent = false, className, ...props }) => {
  return (
    <div
      {...props}
      className={classNames(
        "w-full animate-pulse p-4 rounded-lg flex items-start",
        bgTransparent ? "bg-transparent" : "bg-white",
        className
      )}>
      <div className="w-full sm:w-3/12 md:w-2/12 mr-2">
        <div className="w-full h-4 bg-gray-200 rounded-lg mb-2"></div>
        <div className="w-9/12 h-4 bg-gray-200 rounded-lg mb-2"></div>
      </div>
      <div className="w-full sm:w-9/12 md:w-10/12 ml-2">
        <div className="flex items-center mb-4">
          <div className="w-14 h-4 bg-gray-200 rounded-lg mr-2"></div>
          <div className="w-14 h-4 bg-gray-200 rounded-lg"></div>
        </div>

        <div className="w-full h-4 bg-gray-200 rounded-lg mb-4"></div>
        <div className="w-full h-12 bg-gray-200 rounded-lg mb-4"></div>

        <div className="inline-block px-12 py-4 h-4 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
