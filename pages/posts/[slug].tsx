import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import React, { FC } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Badge from "../../components/Badge/Badge";
import CardAuthor from "../../components/Card/CardAuthor";
import ContainerMedium from "../../components/Container/ContainerMedium";
import IconButton from "../../components/Icon/IconButton";
import NextSeoCustom from "../../components/NextSeo/NextSeoCustom";
import TableOfContents from "../../components/TableOfContents/TableOfContents";
import Typography from "../../components/Typography/Typography";
import postService, { PostI } from "../../core/services/postService";
import { TagI } from "../../core/services/tagService";
import usePrism from "../../hooks/usePrism";

export interface PostSlugProps {
  post: PostI;
  relatedPosts: PostI[];
}

const PostSlug: FC<PostSlugProps> = ({ post, relatedPosts }) => {
  usePrism();

  return (
    <ContainerMedium className="lg:flex lg:flex-wrap my-32 items-start">
      {/* Next-seo Customize */}
      <NextSeoCustom
        title={post.title}
        description={post.description}
        url={"/posts/" + post.slug}
        openGraphArticle={{
          authors: [post.user?.name ?? ""],
          publishedTime: post.publish_at,
          tags: (post.tags ?? [])?.map(({ name }) => name ?? ""),
        }}
        articleJson={{
          title: post.title ?? "",
          description: post.description ?? "",
          authorName: post.user?.name ?? "",
          url: `/posts/${post.slug}`,
          datePublished: post.publish_at ?? post.created_at ?? "",
          images: [post.thumbnail ?? ""],
          type: "Blog",
          dateModified: post.updated_at,
        }}
      />

      <Typography tagName="h1" variant="h2" className="font-bold mb-16 w-full text-center">
        {post.title}
      </Typography>

      <div className="w-full mb-6 lg:sticky top-8">
        <Link href={"/"}>
          <a className="hover:-translate-x-4 transition-all duration-300 inline-block">
            <IconButton>
              <FaArrowLeft />
            </IconButton>
            <span className="ml-2 font-semibold text-blue-500 text-sm">Trở về trang chủ</span>
          </a>
        </Link>
      </div>

      <div className="md:w-4/12 md:pr-4 space-y-4 mb-10 md:mb-0 lg:sticky top-24">
        <CardAuthor title="@duongductrong" description="Frontend Developer" src={post.user?.avatar} />

        {/* Table of contents */}
        {post.table_of_contents.length ? (
          <TableOfContents title="Mục lục bài viết" data={post.table_of_contents} />
        ) : null}
      </div>
      <div className="md:w-8/12 md:pl-4">
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.content_html ?? "" }}></div>

        {/* <Divider className="my-5" /> */}

        <div className="space-y-2 mt-16">
          {/* Tags */}
          <div className="space-x-2 mb-2">
            <span className="font-semibold">Tag: </span>
            {post.tags?.map((tag: TagI, index: number) => (
              <Badge key={index}>{tag.name}</Badge>
            ))}
          </div>

          {/* Related posts */}
          <div className="mt-8 rounded-lg pr-6 py-4">
            <h2 className="text-md mb-4 font-semibold">Có thể bạn quan tâm</h2>
            <ul className="list-disc pl-5">
              {(relatedPosts ?? []).map(({ postId, slug, title }) => (
                <li className="text-sm text-slate-300 font-medium mb-3" key={`${postId}-${slug}`}>
                  <Link href={`/posts/${slug}`}>
                    <a className="text-slate-400 hover:text-blue-600 transition-all duration-300">{title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ContainerMedium>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  let response;
  let post: PostI | null = null;
  let relatedPosts: PostI[] = [];
  let isNotFound: boolean = false;

  const { query } = ctx;
  const slug: any = query.slug;

  try {
    response = await postService.getInfo(slug, { with: "user,tag", relatedPosts: true });
    post = response.data.post;
    relatedPosts = response.data.related_posts;
  } catch (e) {
    isNotFound = true;
  }

  return {
    props: {
      post: post,
      relatedPosts: relatedPosts,
    },
    notFound: isNotFound,
  };
};

export default PostSlug;
