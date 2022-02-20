import { FC } from "react";
import PaginationSimple, { PaginationSimpleProps } from "./components/PaginationSimple/PaginationSimple";

export interface PaginationProps {}

export type PaginationType = FC<PaginationProps> & {
  Simple: FC<PaginationSimpleProps>;
};

const Pagination: PaginationType = ({}) => {
  return null;
};

Pagination.Simple = PaginationSimple;

export default Pagination;
