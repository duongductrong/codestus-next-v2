import classNames from "classnames";
import React, { FC } from "react";

export interface TableOfContentsDataI {
  type?: 1 | 2 | 3 | 4 | 5 | 6 | "1" | "2" | "3" | "4" | "5" | "6";
  text?: string;
  id?: any;
}

export interface TableOfContentsProps {
  title?: string;
  data?: TableOfContentsDataI[];
}

const TableOfContents: FC<TableOfContentsProps> = ({ data, title }) => {
  return (
    <nav>
      <h3 className="text-md font-bold mb-2">{title}</h3>
      <ul>
        {(data ?? []).map(({ id, text, type }) => (
          <li
            key={id}
            className={classNames(
              "relative py-2 cursor-pointer border-l-2 border-l-gray-50/0 hover:border-l-blue-500 hover:bg-blue-50",
              Number(type) === 2
                ? "text-sm font-semibold pl-2 pr-2"
                : Number(type) === 3
                ? "text-xs pl-4 pr-2"
                : Number(type) === 4
                ? "text-xs pl-6 pr-2"
                : Number(type) === 5
                ? "text-xs pl-8 pr-2"
                : Number(type) === 6
                ? "text-xs pl-9 pr-2"
                : "text-xs pl-9 pr-2"
            )}>
            <span dangerouslySetInnerHTML={{ __html: text ?? "" }}></span>
            <a className="absolute top-0 left-0 w-full h-full" href={"#" + id}></a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
