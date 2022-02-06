import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import Button from "../components/Button/Button";
import Empty from "../components/Empty/Empty";
import MainLayout from "../Layout/MainLayout";
import { NextPageWithLayout } from "./_app";

export interface NotFoundProps {}

const NotFound: NextPageWithLayout<NotFoundProps> = ({}) => {
  return (
    <section className="text-center flex items-center justify-center">
      <div className="mt-48">
        <Empty iconSize="2xl" name="We can't found this page for you. <br/> You can back to home" />

        <Link href={"/"} passHref>
          <Button tagName="a" color="secondary" beforeIcon={<FaArrowLeft className="mr-2" />}>
            Trở về trang chủ
          </Button>
        </Link>
      </div>
    </section>
  );
};

NotFound.Layout = MainLayout;

export default NotFound;
