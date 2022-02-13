/* eslint-disable react-hooks/rules-of-hooks */
import moment from "moment";
import { GetServerSideProps } from "next";
import React from "react";
import { HttpResponseApi } from "../core/services/axiosInstance";
import postService, { HttpGetPostsListResponse } from "../core/services/postService";
import tagService, { HttpGetTagsResponse } from "../core/services/tagService";
import useSitemapServerSide from "../hooks/useSitemapServer";

export interface SitemapProps {}

const Sitemap = () => {
  return <div>sitemap.xml</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
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
          lastModify: moment(post.updated_at).toISOString(),
          url: `${appUrl}/posts/${post.slug}`,
          changeFreq: "daily",
          priority: 1.0,
        })
      );
    }

    // Generate tags url
    if (allFetched[fetchIndex.tags].status === "fulfilled") {
      const { data }: HttpResponseApi<HttpGetTagsResponse> = (allFetched[fetchIndex.tags] as any).value;

      tagsUrl = data.data.map((tag) =>
        url({
          lastModify: moment(tag.updated_at).toISOString(),
          url: `${appUrl}/tags/${tag.slug}`,
          changeFreq: "daily",
          priority: 0.9,
        })
      );
    }

    const urls = [
      url({ lastModify: moment().toISOString(), url: `${appUrl}`, priority: 1, changeFreq: "daily" }),
      ...postsUrl,
      ...tagsUrl,
    ];

    res?.setHeader("Content-type", "text/xml");
    res?.write(sitemap(urls));
    res?.end();
  } catch (e) {
    res?.setHeader("Content-type", "text/xml");
    res?.write("Server has error");
    res?.end();
  }

  return {
    props: {},
  };
};

export default Sitemap;
