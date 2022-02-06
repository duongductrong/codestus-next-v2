import classNames from "classnames";
import React, { Children, FC, useEffect, useRef, useState } from "react";
import { AtomicComponent } from "../../@types/global/Common";
import DropdownItem from "./DropdownItem";

export interface DropdownProps extends AtomicComponent {
  action?: any;

  contentClassName?: string;
}

const Dropdown: FC<DropdownProps> = ({ action = () => <div></div>, className, contentClassName, children }) => {
  const dropdownContentRef = useRef<HTMLDivElement | any>();
  const [isOpen, setIsOpen] = useState(false);

  const onToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // To listen clicking global of user not contains element
    const onGlobalToggle = (e: MouseEvent) => {
      const targeted: any = e.target;
      const wrapper: HTMLDivElement = dropdownContentRef.current;

      if (wrapper && !wrapper.contains(targeted)) {
        setIsOpen(false);
      }
    };

    // To listen the user pressing "escape": 27 key
    const onEscape = (e: KeyboardEvent) => {
      // escape = 27
      if (e.keyCode === 27) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("click", onGlobalToggle);
      window.addEventListener("keyup", onEscape);
    }

    return () => {
      window.removeEventListener("click", onGlobalToggle);
    };
  }, [isOpen]);

  return (
    <div className={classNames("relative inline-block", className)}>
      {React.cloneElement(action, { onClick: onToggleDropdown })}

      {isOpen && (
        <div
          ref={dropdownContentRef}
          className={classNames(
            "absolute shadow-md py-2 bg-white rounded-md mt-2 border-t border-slate-200",
            contentClassName
          )}
          style={{ minWidth: "180px" }}>
          {Children.map(children ?? [], (child: any, index: number) =>
            React.cloneElement(child, { onClick: onToggleDropdown, tabIndex: index })
          )}
        </div>
      )}
    </div>
  );
};

export { DropdownItem };

export default Dropdown;
