import { useEffect, useState } from "react";

function useMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => setIsMounted(false);
  }, []);

  return { isMounted };
}

export default useMounted;
