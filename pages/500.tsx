/* eslint-disable react/no-unescaped-entities */
import React from "react";
import ServerError from "../components/Error/ServerError";
import MainLayout from "../Layout/MainLayout";
import { NextPageWithLayout } from "./_app";

export interface ServerErrorProps {}

const ServerErrorPage: NextPageWithLayout<ServerErrorProps> = ({}) => {
  return <ServerError />;
};

ServerErrorPage.Layout = MainLayout;

export default ServerErrorPage;
