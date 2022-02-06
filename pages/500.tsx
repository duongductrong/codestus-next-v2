import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import Button from "../components/Button/Button";
import Empty from "../components/Empty/Empty";
import MainLayout from "../Layout/MainLayout";
import { NextPageWithLayout } from "./_app";

export interface ServerErrorProps {}

const ServerError: NextPageWithLayout<ServerErrorProps> = ({}) => {
  return (
    <section className="text-center flex items-center justify-center">
      <div className="mt-48">
        <Empty iconSize="2xl" name="Server error" />

        <Link href={"/"} passHref>
          <Button tagName="a" color="secondary" beforeIcon={<FaArrowLeft className="mr-2" />}>
            Trở về trang chủ
          </Button>
        </Link>
      </div>
    </section>
  );
};

ServerError.Layout = MainLayout;

export default ServerError;
