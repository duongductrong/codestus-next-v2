import { useEffect } from "react";

function useScript(src: string, callback?: Function) {
  useEffect(() => {
    const script: HTMLScriptElement = document.createElement("script");

    script.setAttribute("src", src);
    script.setAttribute("type", "text/javascript");

    document.body.appendChild(script);

    script.onload = () => (callback ? callback() : null);

    return () => {
      document.body.removeChild(script);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return null;
}

export default useScript;
