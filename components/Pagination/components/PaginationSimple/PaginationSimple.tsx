import classNames from "classnames";
import Link from "next/link";
import React, { FC } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export interface PaginationSimpleProps {
  currentPage?: number;
  totalPages?: number;

  align?: "left" | "center" | "right";
  prefix?: string;
}

const PaginationSimple: FC<PaginationSimpleProps> = ({ currentPage = 1, totalPages = 0, align = "center", prefix = "/page" }) => {
  const _align =
    align === "center" ? "justify-center" : align === "left" ? "justify-start" : align === "right" ? "justify-end" : "";

  return (
    <nav role="navigation" className={classNames("flex items-center", _align)}>
      <Link href={currentPage && currentPage > 2 ? `${prefix}/${currentPage - 1}` : `${ currentPage <= 2 && prefix !== "/page" ? prefix : "/" }`}>
        <a
          className={classNames(
            "font-bold inline-flex items-center mr-2 hover:-translate-x-4 transition-all duration-300",
            {
              "text-slate-300 pointer-events-none": currentPage === 1,
            }
          )}>
          <FaArrowLeft className="mr-2" /> Newest
        </a>
      </Link>

      <Link
        href={
          currentPage && totalPages && (currentPage < totalPages ?? 0)
            ? `${prefix}/${currentPage + 1}`
            : `${prefix}/${currentPage}`
        }>
        <a
          className={classNames(
            "font-bold inline-flex items-center ml-2 hover:translate-x-4 transition-all duration-300",
            {
              "text-slate-300 pointer-events-none": currentPage === totalPages,
            }
          )}>
          Oldest <FaArrowRight className="ml-2" />
        </a>
      </Link>
    </nav>
  );
};

export default PaginationSimple;
