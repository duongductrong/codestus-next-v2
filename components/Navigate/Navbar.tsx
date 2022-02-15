import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { AtomicComponent } from "../../@types/global/Common";
import Overlay from "../Overlay/Overlay";
import Typography from "../Typography/Typography";

export interface DataMenuI {
  id: string | number;
  name: string;
  href: string;
  type: "external" | "internal";
}
export interface NavbarProps extends Omit<AtomicComponent, "tagName"> {}
export interface NavbarBarsProps extends Omit<AtomicComponent, "tagName"> {}

export const menus: DataMenuI[] = [
  {
    id: Math.random() + new Date().getTime(),
    name: "Articles",
    href: "/",
    type: "internal",
  },
  {
    id: Math.random() + new Date().getTime(),
    name: "Contributor",
    href: "https://insignt.codestus.com",
    type: "external",
  },
];

export const NavbarBars: FC<NavbarBarsProps> = ({ className, ...props }) => {
  return (
    <div {...props} className={classNames("cursor-pointer z-50 mix-blend-difference", className)}>
      <div className="bg-white max-w-full mb-1 mx-auto" style={{ width: "30px", height: "2px" }}></div>
      <div className="bg-white max-w-full mb-1 mx-auto" style={{ width: "30px", height: "2px" }}></div>
      <div className="bg-white max-w-full mb-1 mx-auto" style={{ width: "30px", height: "2px" }}></div>
    </div>
  );
};

const Navbar: FC<NavbarProps> = ({ ...props }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  // const [position, setPosition] = useState({ x: 0, y: 0 });

  const onToggleSlide = (/* event: React.MouseEvent<HTMLElement, MouseEvent> */) => {
    setIsOpen(!isOpen);

    // const currentElement: HTMLDivElement = event.target as any;
    // const { x, y } = currentElement.getBoundingClientRect();

    // setPosition({ x: x - 48 / 2, y: y - 48 / 2 });
  };

  /**
   * On listen close menu sliding
   */
  const onCloseMenu = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <nav role="navigation" {...props}>
      <Overlay>
        <CSSTransition mountOnEnter={true} unmountOnExit={true} timeout={500} classNames="slide" in={isOpen}>
          <div className="fixed w-full bg-gray-900 left-0 top-0 transition-all duration-700 z-40 p-4 flex items-center justify-center flex-col">
            <div className="mb-4 text-center">
              Welcome to you.
              <br />
              Learning everyday with codestus.
            </div>
            <div className="space-y-12 sm:space-x-20 sm:space-y-0 flex flex-wrap justify-center">
              {(menus ?? []).map(({ name, href, id, type }) => {
                return type === "internal" ? (
                  <Link key={id} href={href} passHref>
                    <Typography
                      onClick={onCloseMenu}
                      tagName="a"
                      variant="h2"
                      className={classNames(
                        "font-bold hover:text-slate-100 transition-all duration-300 cursor-pointer",
                        router.pathname === href ? "text-slate-100" : ""
                      )}>
                      {name}
                    </Typography>
                  </Link>
                ) : (
                  <a rel="noreferrer" target={"_blank"} key={id} href={href}>
                    <Typography
                      onClick={onCloseMenu}
                      tagName="a"
                      variant="h2"
                      className={classNames(
                        "font-bold hover:text-slate-100 transition-all duration-300 cursor-pointer",
                        router.pathname === href ? "text-slate-100" : ""
                      )}>
                      {name}
                    </Typography>
                  </a>
                );
              })}
            </div>
          </div>
        </CSSTransition>

        <NavbarBars onClick={onToggleSlide} className="z-50 fixed right-5 bottom-5 transition-all duration-700" />
      </Overlay>
    </nav>
  );
};

export default Navbar;
