import React, { FC } from "react";
import Navbar from "../components/Navigate/Navbar";

export interface MainLayoutProps {}

const MainLayout: FC<MainLayoutProps> = (children) => {
  return (
    <section>
      <Navbar />
      <div className="container py-8">{children}</div>
    </section>
  );
};

export default MainLayout;
