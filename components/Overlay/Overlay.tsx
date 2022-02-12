import { FC } from "react";
import { createPortal } from "react-dom";
import useMounted from "../../hooks/useMounted";

export interface OverLayProps {}

const Overlay: FC<OverLayProps> = ({ children }) => {
  const { isMounted } = useMounted();

  return isMounted ? createPortal(children ?? null, document.querySelector("#portal-overlay") as any) : null;
};

export default Overlay;
