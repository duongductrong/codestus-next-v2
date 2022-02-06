/* eslint-disable @next/next/next-script-for-ga */
import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html className="light">
        <Head />

        {/* <!-- Google Tag Manager --> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5GTSSXK');`,
          }}></script>
        {/* <!-- End Google Tag Manager --> */}

        {/* <!-- GA4- Global site tag (gtag.js) - Google Analytics --> */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-W5HXEXS0SF"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
    
        gtag('config', 'G-W5HXEXS0SF');`,
          }}></script>

        {/* <!-- UA- Global site tag (gtag.js) - Google Analytics --> */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-148416370-3"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-148416370-3');`,
          }}></script>

        {/* <!-- Google Adsense --> */}
        <script
          data-ad-client="ca-pub-3274325178159722"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <body className="bg-grid-slate-100 scroll-smooth">
          {/* <!-- Google Tag Manager (noscript) --> */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5GTSSXK" height="0" width="0"
            style="display:none;visibility:hidden"></iframe>`,
            }}></noscript>
          {/* <!-- End Google Tag Manager (noscript) --> */}

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
