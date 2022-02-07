import Link from "next/link";
import React, { FC } from "react";
import { FaHome } from "react-icons/fa";
import { AtomicComponent } from "../../@types/global/Common";
import IconButton from "../Icon/IconButton";

export interface NavbarProps extends Omit<AtomicComponent, "tagName"> {}

const Navbar: FC<NavbarProps> = ({ ...props }) => {
  return (
    <nav role="navigation" {...props} className="fixed right-5 bottom-5">
      <Link href={"/"}>
        <a title="Trang chủ">
          <IconButton>
            <FaHome />
          </IconButton>
        </a>
      </Link>
    </nav>
  );
};

export default Navbar;
