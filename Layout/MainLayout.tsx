import classNames from "classnames";
import Router from "next/router";
import React, { FC, useState } from "react";
import Navbar from "../components/Navigate/Navbar";

export interface MainLayoutProps {}

const MainLayout: FC<MainLayoutProps> = (children) => {
  const [routeChange, setRouteChange] = useState(false);

  Router.events.on("routeChangeStart", () => {
    setRouteChange(true);
  });

  Router.events.on("routeChangeComplete", () => {
    setRouteChange(false);
  });

  return (
    <section>
      <Navbar />
      <div
        className={classNames("container py-8", {
          "main-layout-css": !routeChange,
        })}>
        {children}
      </div>
    </section>
  );
};

export default MainLayout;
