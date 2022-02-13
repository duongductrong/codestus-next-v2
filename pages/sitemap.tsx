import { NextPage } from "next";
import React from "react";

export interface SitemapProps {}

const Sitemap: NextPage = () => {
  return <div>sitemap</div>;
};

Sitemap.getInitialProps = async ({ res }) => {
  // Get url showing sitemap.xml
  const sitemapUrl = process.env.APP_SITEMAP;
  // Check response and redirect to it
  if (res) {
    res.writeHead(307, { location: sitemapUrl });
    res.end();
  }
  return {};
};

export default Sitemap;
