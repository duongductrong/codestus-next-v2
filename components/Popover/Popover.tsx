import React, {
  FC,
  FunctionComponentElement,
  ReactElement,
  ReactNode,
  ReactText,
  useEffect,
  useRef,
  useState,
} from "react";
import { CSSTransition } from "react-transition-group";
import { AtomicComponent } from "../../@types/global/Common";
import PopoverItem, { PopoverItemProps } from "./PopoverItem";

export interface PopoverProps extends AtomicComponent {
  /**
   * HTMLElement | ReactNode
   */
  action:
    | ReactNode
    | JSX.Element
    | ReactElement<any | ReactText>
    | JSX.IntrinsicElements
    | FunctionComponentElement<any>;

  content?: ReactNode | JSX.Element | JSX.IntrinsicElements | FunctionComponentElement<any> | FC;

  // Event active
  mouseAction?: boolean;
  clickAction?: boolean;
}

export type PopoverWithChild = FC<PopoverProps> & {
  Item: FC<PopoverItemProps>;
};

const Popover: PopoverWithChild = ({
  action,

  mouseAction = false,
  clickAction = true,

  content,
  children,
}) => {
  const popoverContentRef = useRef<HTMLDivElement | any>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (!action) {
    throw new Error("Action should be exist for popover");
  }

  /**
   * @description To open and close popover
   * @event onClick
   */
  const onTogglePopover = () => {
    setIsOpen(!isOpen);
  };

  /**
   * @description On open the popover when mouse enter
   */
  const onMouseEnterPopover = () => {
    if (!isOpen) setIsOpen(true);
  };

  /**
   * @description On open the popover when mouse leaved
   */
  const onMouseLeavePopover = () => {
    if (isOpen) setIsOpen(false);
  };

  useEffect(() => {
    /**
     * @description Window clicking or mouse enter outside popover content or wrapper
     * then close popover
     */
    const onClosePopover = (e: MouseEvent) => {
      const target: any = e.target;
      const wrapper: HTMLDivElement = popoverContentRef.current;

      if (wrapper && !wrapper.contains(target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener(clickAction ? "click" : mouseAction ? "mouseover" : "click", onClosePopover);
    }

    return () => {
      window.removeEventListener(clickAction ? "click" : mouseAction ? "mouseover" : "click", onClosePopover);
    };
  }, [isOpen, clickAction, mouseAction]);

  return (
    <div
      className="inline-block relative z-30"
      onMouseEnter={mouseAction ? onMouseEnterPopover : () => {}}
      onMouseLeave={mouseAction ? onMouseLeavePopover : () => {}}>
      {React.cloneElement(action as any, {
        onClick: clickAction ? onTogglePopover : () => {},
      })}

      <CSSTransition
        in={isOpen}
        timeout={500}
        classNames="fade-io-y"
        onEnter={() => setIsOpen(true)}
        onExited={() => setIsOpen(false)}
        unmountOnExit>
        <div
          ref={popoverContentRef}
          className="absolute -left-12 bg-white min-w-full rounded-lg mt-2 overflow-hidden shadow-md shadow-slate-200 border-t border-slate-100 transition-all duration-300"
          style={{ minWidth: "200px" }}>
          <div className="p-4 space-y-2">{children}</div>
          {content && <div className="bg-slate-50/75 p-4">{content}</div>}
        </div>
      </CSSTransition>
    </div>
  );
};

Popover.Item = PopoverItem;

export { PopoverItem };

export default Popover;
