/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import React, { FC } from "react";
import { FaArrowLeft, FaServer } from "react-icons/fa";
import Button from "../Button/Button";
import Typography from "../Typography/Typography";

export interface ServerErrorProps {}

const ServerError: FC<ServerErrorProps> = ({}) => {
  return (
    <section className="text-center flex items-center justify-center">
      <div className="mt-48">
        <FaServer size={148} className="text-slate-300 mx-auto py-5" />

        <Typography tagName="h1" variant="h1" className="font-bold mb-4">
          500
        </Typography>

        <Typography variant="h2" tagName="p" className="mb-6 font-bold">
          Server Error!
        </Typography>

        <Typography variant="p" tagName="p" className="mb-8 text-slate-400">
          We detected an error with the server, please come back later
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

export default ServerError;
