/* eslint-disable react/no-unescaped-entities */
import React from "react";
import NotFound from "../components/Error/NotFound";
import MainLayout from "../Layout/MainLayout";
import { NextPageWithLayout } from "./_app";

export interface NotFoundProps {}

const NotFoundPage: NextPageWithLayout<NotFoundProps> = ({}) => {
  return <NotFound />;
};

NotFoundPage.Layout = MainLayout;

export default NotFoundPage;
