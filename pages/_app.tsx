import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import "nprogress/nprogress.css";
import { Fragment, ReactElement, ReactNode } from "react";
import ProgressingN from "../components/Progressing/ProgressingN";
import "../styles/globals.css";
import "../styles/vendors/_prism-okaidia.css";
import "../styles/_fade-io-y-transition.css";

export type NextPageWithLayout<T = any> = NextPage<T> & {
  // eslint-disable-next-line no-unused-vars
  Layout: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Persist Layout
  const getLayout = Component.Layout || ((page) => page);

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="keywords"
          content="javascript tips, lập trình javascript, php tips, lập trình php, code javascript hay, lập trình php, fullstack, cộng đồng lập trình"
        />
      </Head>
      {getLayout(<Component {...pageProps} />)}
      <ProgressingN />
    </Fragment>
  );
}

export default MyApp;
