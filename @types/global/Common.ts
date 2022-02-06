import React from "react";

export interface AtomicComponent<T = HTMLElement> extends Omit<React.HTMLAttributes<T>, ""> {
  /**
   * Defined developer can choosing tag html
   */
  tagName?: keyof JSX.IntrinsicElements;
}

export type AtomicSizeType = "xs" | "sm" | "md" | "lg" | "xl";
