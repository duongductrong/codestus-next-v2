import classNames from "classnames";
import React, { FC } from "react";
import { AtomicComponent } from "../../@types/global/Common";
import useScript from "../../hooks/useScript";

export interface GiscusProps extends AtomicComponent {
  dataRepo?: string;
  dataRepoId?: string;
  dataCategory?: string;
  dataCategoryId?: string;
  dataMapping?: string;
  dataReactionsEnabled?: string;
  dataEmitMetadata?: string;
  dataInputPosition?: string;
  dataTheme?: string;
  dataLang?: string;
  crossorigin?: string;
  async?: boolean;
}

const Giscus: FC<GiscusProps> = ({
  dataRepo,
  dataRepoId,
  dataCategory,
  dataCategoryId,
  dataMapping,
  async,
  crossorigin,
  dataEmitMetadata,
  dataInputPosition,
  dataLang,
  dataReactionsEnabled,
  dataTheme,
  tagName = "div",
  className,
  ...props
}) => {
  useScript("https://giscus.app/client.js", {
    attributes: [
      {
        key: "data-repo",
        value: dataRepo,
      },
      {
        key: "data-repo-id",
        value: dataRepoId,
      },
      {
        key: "data-category",
        value: dataCategory,
      },
      {
        key: "data-category-id",
        value: dataCategoryId,
      },
      {
        key: "data-mapping",
        value: dataMapping,
      },
      {
        key: "data-reactions-enabled",
        value: dataReactionsEnabled,
      },
      {
        key: "data-emit-metadata",
        value: dataEmitMetadata,
      },
      {
        key: "data-input-position",
        value: dataInputPosition,
      },
      {
        key: "data-theme",
        value: dataTheme,
      },
      {
        key: "data-lang",
        value: dataLang,
      },
      {
        key: "crossorigin",
        value: crossorigin,
      },
      {
        key: "async",
        value: async,
      },
    ],
  });

  const ComponentName: any = tagName;

  return <ComponentName {...props} className={classNames("giscus", className)} id="giscus"></ComponentName>;
};

export default Giscus;
