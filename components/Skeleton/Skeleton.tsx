import React, { FC } from "react";
import CardSkeleton, { CardSkeletonProps } from "./components/CardSkeleton";

export interface SkeletonProps {}

export type SkeletonDefinedType = FC<SkeletonProps> & {
  Card: FC<CardSkeletonProps>;
};

const Skeleton: SkeletonDefinedType = ({}) => {
  return <div></div>;
};

Skeleton.Card = CardSkeleton;

export default Skeleton;
