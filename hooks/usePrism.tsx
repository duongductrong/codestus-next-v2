/**
 * usePrism helping you add the script execute 
 * prism-js in document html
 * 
 * @author duongductrong
 */

import { useEffect } from "react";

function usePrism() {
  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("src", "/vendors/js/prism.js");
    document.body.append(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return [];
}

export default usePrism;
