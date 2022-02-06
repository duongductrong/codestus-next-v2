import Link from "next/link";
import React, { FC } from "react";
import { AtomicComponent } from "../../@types/global/Common";
import Dropdown, { DropdownItem } from "../Dropdown/Dropdown";

export interface NavbarProps extends Omit<AtomicComponent, "tagName"> {}

const Navbar: FC<NavbarProps> = ({ ...props }) => {
  return (
    <nav {...props} className="border-b border-slate-100 dark:border-slate-700 bg-white/75 dark:bg-slate-900 py-3 px-4">
      <div className="container flex justify-between items-center mx-auto">
        <Link href="/" passHref={true}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="cursor-pointer"
            width="30px"
            height="30px"
            src="https://camo.githubusercontent.com/add2c9721e333f0043ac938f3dadbc26a282776e01b95b308fcaba5afaf74ae3/68747470733a2f2f6173736574732e76657263656c2e636f6d2f696d6167652f75706c6f61642f76313538383830353835382f7265706f7369746f726965732f76657263656c2f6c6f676f2e706e67"
            alt="Logo"
          />
        </Link>

        <div className="space-x-6 flex items-center">
          <Link href={"/"}>
            <a className="text-sm rounded-md px-2 py-1 hover:text-slate-700 transition-all duration-300">Trang chủ</a>
          </Link>
          <Link href={"/blog"}>
            <a className="text-sm rounded-md px-2 py-1 hover:text-slate-700 transition-all duration-300">Bài viết</a>
          </Link>
          {/* <Link href={"/"}>
            <a className="text-sm rounded-md px-2 py-1 hover:text-slate-700 transition-all duration-300">Thể loại</a>
          </Link> */}

          <Dropdown
            contentClassName="right-1"
            action={
              <a className="text-sm rounded-md px-2 py-1 hover:text-slate-700 transition-all duration-300">Thể loại</a>
            }>
            <DropdownItem>Hyper</DropdownItem>
            <DropdownItem>React</DropdownItem>
          </Dropdown>

          <div className="border-r border-slate-300 self-stretch"></div>

          <a href="#">
            <svg
              width="20px"
              height="20px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 17 16"
              fill="none"
              className="jsx-2497056392">
              <g clipPath="url(githublogo)" className="jsx-2497056392">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M8.18391.249268C3.82241.249268.253906 3.81777.253906 8.17927c0 3.46933 2.279874 6.44313 5.451874 7.53353.3965.0991.49563-.1983.49563-.3965v-1.3878c-2.18075.4956-2.67638-.9912-2.67638-.9912-.3965-.8922-.89212-1.1895-.89212-1.1895-.69388-.4957.09912-.4957.09912-.4957.793.0992 1.1895.793 1.1895.793.69388 1.2887 1.88338.8922 2.27988.6939.09912-.4956.29737-.8921.49562-1.0904-1.78425-.1982-3.5685-.8921-3.5685-3.96496 0-.89212.29738-1.586.793-2.08162-.09912-.19825-.3965-.99125.09913-2.08163 0 0 .69387-.19825 2.18075.793.59475-.19825 1.28862-.29737 1.9825-.29737.69387 0 1.38775.09912 1.98249.29737 1.4869-.99125 2.1808-.793 2.1808-.793.3965 1.09038.1982 1.88338.0991 2.08163.4956.59475.793 1.28862.793 2.08162 0 3.07286-1.8834 3.66766-3.66764 3.86586.29737.3965.59474.8921.59474 1.586v2.1808c0 .1982.0991.4956.5948.3965 3.172-1.0904 5.4518-4.0642 5.4518-7.53353-.0991-4.3615-3.6676-7.930002-8.02909-7.930002z"
                  clipRule="evenodd"
                  className="jsx-2497056392"></path>
              </g>
              <defs className="jsx-2497056392">
                <clipPath id="githublogo" className="jsx-2497056392">
                  <path
                    fill="transparent"
                    d="M0 0h15.86v15.86H0z"
                    transform="translate(.253906 .0493164)"
                    className="jsx-2497056392"></path>
                </clipPath>
              </defs>
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
