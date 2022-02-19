import { useEffect } from "react";

export interface useScriptAttributesI {
  key: string;
  value: any;
}

export interface useScriptOptionsI {
  callback?: Function;
  attributes?: useScriptAttributesI[];
}

function useScript(src: string, options?: useScriptOptionsI) {
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
  }, [src, options]);

  return null;
}

export default useScript;
