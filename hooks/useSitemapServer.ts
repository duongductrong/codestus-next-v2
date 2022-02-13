export interface UrlSitemapI {
  lastModify?: any;
  url: string;
  changeFreq: "daily" | "weekly" | "monthly";
  priority: 1.0 | 0.9 | 0.8 | 0.7 | 0.6 | 0.5 | 0.4 | 0.3 | 0.2 | 0.1 | 0;
}

function useSitemapServerSide() {
  // Generate skeleton sitemap
  const sitemap = (urls: string[]) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${urls.join("\n")}
    </urlset>`;

  // Generate skeleton url in sitemap
  const url = ({ lastModify, url, changeFreq, priority }: UrlSitemapI) => `<url>
    <loc>${url}</loc>
    <lastmod>${lastModify}</lastmod>
    <changefreq>${changeFreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;

  return { sitemap, url };
}

export default useSitemapServerSide;
