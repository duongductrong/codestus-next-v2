import { FC } from "react";
import NProgress from "nprogress";
import { Router } from "next/router";

export interface ProgressingNProps {}

const ProgressingN: FC<ProgressingNProps> = ({}) => {
  NProgress.configure({});

  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });

  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });

  Router.events.on("routeChangeError", () => {
    NProgress.done();
  });

  return null;
};

export default ProgressingN;
