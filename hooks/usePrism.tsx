/**
 * usePrism helping you add the script execute
 * prism-js in document html
 *
 * @author duongductrong
 */

import useScript from "./useScript";

function usePrism() {
  useScript("/vendors/js/prism.js", { prefetch: true });
}

export default usePrism;
