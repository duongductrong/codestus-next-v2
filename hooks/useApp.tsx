import { useRouter } from "next/router";
import {} from "react";

function useApp() {
  const router = useRouter();

  const getAppUrl = () => {
    return process.env.APP_URL;
  };

  const getCanonicalUrl = () => {
    return `${getAppUrl()}${router.asPath}`;
  };

  return { getAppUrl, getCanonicalUrl };
}

export default useApp;
