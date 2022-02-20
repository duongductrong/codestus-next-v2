import Router from "next/router";
import { useEffect, useState } from "react";

export interface useScriptAttributesI {
  key: string;
  value: any;
}

export interface useScriptOptionsI {
  callback?: Function;
  attributes?: useScriptAttributesI[];
  prefetch?: boolean;
}

function useScript(src: string, options?: useScriptOptionsI) {
  const [rePrefetch, setRepreFetch] = useState(Math.random());

  useEffect(() => {
    const script: HTMLScriptElement = document.createElement("script");
    const randomId = Math.random().toString();

    // Static attribute should be set
    script.setAttribute("src", src);
    script.setAttribute("type", "text/javascript");
    script.setAttribute("id", randomId);

    // Optional setup more attribute for script
    if (options?.attributes?.length) {
      options?.attributes.forEach(({ key, value }) => {
        script.setAttribute(key, value);
      });
    }

    // and invoke the callback after on loaded
    script.onload = () => (options?.callback ? options?.callback() : null);

    // append to body html
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [src, options, rePrefetch]);

  if (options?.prefetch) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    Router.events.on("routeChangeComplete", () => {
      setRepreFetch(Math.random());
    });
  }

  return null;
}

export default useScript;
