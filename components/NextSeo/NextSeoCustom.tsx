import { ArticleJsonLd, ArticleJsonLdProps, NextSeo } from "next-seo";
import { OpenGraphArticle } from "next-seo/lib/types";
import React, { FC, Fragment } from "react";

export interface NextSeoCustomProps {
  url?: string;
  title?: string;
  description?: string;

  openGraphArticle?: OpenGraphArticle;

  articleJson?: ArticleJsonLdProps;
}

const NextSeoCustom: FC<NextSeoCustomProps> = ({
  title,
  description,
  url = "https://codestus.com",
  openGraphArticle,
  articleJson,
}) => {
  return (
    <Fragment>
      <NextSeo
        defaultTitle="Trang chủ - Codestus.com | Frontend Developer"
        title={title ?? "Trang chủ - Codestus.com | Frontend Developer"}
        description={
          description ?? "Codestus.com - Blog, Tutorials, Chia sẽ kinh nghiệm Frontend, UX/UI, ReactJS, VueJS"
        }
        canonical={url ?? ""}
        openGraph={{
          title: title ?? "Trang chủ - Codestus.com | Frontend Developer",
          description:
            description ?? "Codestus.com - Blog, Tutorials, Chia sẽ kinh nghiệm Frontend, UX/UI, ReactJS, VueJS",
          url: url,
          // eslint-disable-next-line camelcase
          site_name: "codestus",
          type: "website",

          article: openGraphArticle,

          images: [
            {
              url: "/statics/open-graph-image.png",
              width: 1500,
              height: 780,
              alt: "Codestus.com",
              type: "image/png",
              secureUrl: "/statics/open-graph-image.png",
            },
          ],
        }}
        twitter={{
          site: url,
          cardType: "summary_large_image",
          handle: "@handle",
        }}
        additionalLinkTags={[
          {
            rel: "manifest",
            href: "/statics/icons/manifest.json",
          },
          {
            rel: "icon",
            href: "/statics/icons/favicon.ico",
          },
          { rel: "apple-touch-icon", sizes: "57x57", href: "/statics/icons/apple-icon-57x57.png" },
          { rel: "apple-touch-icon", sizes: "60x60", href: "/statics/icons/apple-icon-60x60.png" },
          { rel: "apple-touch-icon", sizes: "72x72", href: "/statics/icons/apple-icon-72x72.png" },
          { rel: "apple-touch-icon", sizes: "76x76", href: "/statics/icons/apple-icon-76x76.png" },
          { rel: "apple-touch-icon", sizes: "114x114", href: "/statics/icons/apple-icon-114x114.png" },
          { rel: "apple-touch-icon", sizes: "120x120", href: "/statics/icons/apple-icon-120x120.png" },
          { rel: "apple-touch-icon", sizes: "144x144", href: "/statics/icons/apple-icon-144x144.png" },
          { rel: "apple-touch-icon", sizes: "152x152", href: "/statics/icons/apple-icon-152x152.png" },
          { rel: "apple-touch-icon", sizes: "180x180", href: "/statics/icons/apple-icon-180x180.png" },
          {
            rel: "icon",
            type: "image/png",
            sizes: "192x192",
            href: "/statics/icons/android-icon-192x192.png",
          },
          { rel: "icon", type: "image/png", sizes: "32x32", href: "/statics/icons/favicon-32x32.png" },
          { rel: "icon", type: "image/png", sizes: "96x96", href: "/statics/icons/favicon-96x96.png" },
          { rel: "icon", type: "image/png", sizes: "16x16", href: "/statics/icons/favicon-16x16.png" },
        ]}
      />
      {articleJson && <ArticleJsonLd {...articleJson} />}
    </Fragment>
  );
};

export default NextSeoCustom;
