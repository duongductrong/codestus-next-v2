/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import React, { FC } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Button from "../Button/Button";
import Empty from "../Empty/Empty";
import Typography from "../Typography/Typography";

export interface NotFoundProps {}

const NotFound: FC<NotFoundProps> = ({}) => {
  return (
    <section className="text-center flex items-center justify-center">
      <div className="mt-48">
        <Empty iconSize="2xl" />

        <Typography tagName="h1" variant="h1" className="font-bold mb-4">
          404
        </Typography>

        <Typography variant="h2" tagName="p" className="mb-6 font-bold">
          Page Not Found
        </Typography>

        <Typography variant="p" tagName="p" className="mb-8 text-slate-400">
          The requested page doesn't exist or you don't have access to it.
        </Typography>

        <Link href={"/"} passHref>
          <Button tagName="a" color="none" beforeIcon={<FaArrowLeft className="mr-2" />}>
            Trở về trang chủ
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
