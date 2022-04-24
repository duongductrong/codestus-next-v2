/* eslint-disable react-hooks/rules-of-hooks */
import fs from "fs";
import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import { HttpResponseApi } from "../../core/services/axiosInstance";
import postService, { HttpGetPostsListResponse } from "../../core/services/postService";
import tagService, { HttpGetTagsResponse } from "../../core/services/tagService";
import useSitemapServerSide from "../../hooks/useSitemapServer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get url showing sitemap.xml
    const { sitemap, url } = useSitemapServerSide();
    const appUrl = process.env.APP_URL;
    let postsUrl: string[] = [],
      tagsUrl: string[] = [];

    const allFetched = await Promise.allSettled([
      postService.getList({ page: 1, rowsPerPage: 9999, orderBy: "desc" }, {}),
      tagService.getTags({ page: 1, rowsPerPage: 999 }),
    ]);
    const fetchIndex = { post: 0, tags: 1 };

    // Generate posts url
    if (allFetched[fetchIndex.post].status === "fulfilled") {
      const { data }: HttpResponseApi<HttpGetPostsListResponse> = (allFetched[fetchIndex.post] as any).value;

      postsUrl = data.posts.data.map((post) =>
        url({
          lastModify: moment(post.updated_at).format(),
          url: `${appUrl}/posts/${post.slug}`,
          changeFreq: "daily",
          priority: 1,
        })
      );
    }

    // Generate tags url
    if (allFetched[fetchIndex.tags].status === "fulfilled") {
      const { data }: HttpResponseApi<HttpGetTagsResponse> = (allFetched[fetchIndex.tags] as any).value;

      tagsUrl = data.data.map((tag) =>
        url({
          lastModify: moment(tag.updated_at).format(),
          url: `${appUrl}/tags/${tag.slug}`,
          changeFreq: "daily",
          priority: 1,
        })
      );
    }

    const urls = [
      url({ lastModify: moment().format(), url: `${appUrl}`, priority: 1, changeFreq: "daily" }),
      ...postsUrl,
      ...tagsUrl,
    ];

    // Paths frm .nextjs
    const outDir: string = `public/sitemap.xml`;
    const sitemapContents: string = sitemap(urls);

    fs.writeFile(outDir, sitemapContents, (error) => {
      console.log(error);
    });

    res?.setHeader("Content-type", "text/plain");
    res?.write("Created sitemap.xml");
    res?.end();
  } catch (e) {
    res?.setHeader("Content-type", "text/plain");
    res?.write("Server has error");
    res?.end();
  }
}
