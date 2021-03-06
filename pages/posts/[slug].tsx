import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import Badge from "../../components/Badge/Badge";
import ContainerMedium from "../../components/Container/ContainerMedium";
import Giscus from "../../components/Discuss/Giscus";
import Empty from "../../components/Empty/Empty";
import IconButton from "../../components/Icon/IconButton";
import NextSeoCustom from "../../components/NextSeo/NextSeoCustom";
import TableOfContents from "../../components/TableOfContents/TableOfContents";
import Typography from "../../components/Typography/Typography";
import hitService from "../../core/services/hitService";
import postService, { PostI } from "../../core/services/postService";
import { TagI } from "../../core/services/tagService";
import useApp from "../../hooks/useApp";
import usePrism from "../../hooks/usePrism";
import MainLayout from "../../Layout/MainLayout";
import { NextPageWithLayout } from "../_app";

export interface PostSlugProps {
  post?: PostI;
  relatedPosts?: PostI[];
}

const PostSlug: NextPageWithLayout<PostSlugProps> = ({ post, relatedPosts }) => {
  usePrism();

  const router = useRouter();
  const { getCanonicalUrl } = useApp();

  const onPreviousPage = () => {
    router.back();
  };

  // Hit mean is increase visitor counting of post
  // Base on slug to find the post can be update visitor quantity
  useEffect(() => {
    try {
      hitService.hitPost(post?.slug ?? "");
    } catch {}
  }, [post?.slug]);

  return (
    <ContainerMedium className="lg:flex lg:flex-wrap my-32 items-start">
      {/* Next-seo Customize */}
      <NextSeoCustom
        title={post?.title}
        description={post?.description}
        url={getCanonicalUrl()}
        images={
          post?.thumbnail
            ? [
                {
                  url: post?.thumbnail,
                  alt: post?.title,
                  secureUrl: post?.thumbnail,
                },
              ]
            : []
        }
        openGraphArticle={{
          authors: [post?.user?.name ?? ""],
          publishedTime: post?.publish_at,
          tags: (post?.tags ?? [])?.map(({ name }) => name ?? ""),
        }}
        articleJson={{
          title: post?.title ?? "",
          description: post?.description ?? "",
          authorName: post?.user?.name ?? "",
          url: getCanonicalUrl(),
          datePublished: post?.publish_at ?? post?.created_at ?? "",
          images: [post?.thumbnail ?? ""],
          type: "Blog",
          dateModified: post?.updated_at,
        }}
      />

      <div className="utterances"></div>

      <Typography tagName="h1" variant="h2" className="font-bold mb-16 w-full text-center">
        {post?.title}
      </Typography>

      <div className="w-full mb-6 lg:sticky top-8 space-x-4">
        <a className="inline-block" onClick={onPreviousPage}>
          <IconButton>
            <FaArrowLeft />
          </IconButton>
          {/* <span className="ml-2 font-semibold text-blue-500 text-sm">Tr??? v??? trang ch???</span> */}
        </a>
        <Link href={"/"}>
          <a className="inline-block">
            <IconButton>
              <FaHome />
            </IconButton>
            {/* <span className="ml-2 font-semibold text-blue-500 text-sm">Tr??? v??? trang ch???</span> */}
          </a>
        </Link>
      </div>

      <div className="md:w-4/12 md:pr-4 space-y-4 mb-10 md:mb-0 lg:sticky top-24">
        {/* <CardAuthor title="@codestus.com" description="Web developer" src={post?.user?.avatar} /> */}

        {/* Table of contents */}
        {post?.table_of_contents.length ? (
          <TableOfContents title="M???c l???c b??i vi???t" data={post?.table_of_contents} />
        ) : null}
      </div>
      <div className="md:w-8/12 md:pl-4">
        <article className="prose" dangerouslySetInnerHTML={{ __html: post?.content_html ?? "" }}></article>

        {/* <Divider className="my-5" /> */}

        <div className="space-y-2 mt-16">
          {/* Tags */}
          <div className="space-x-2 mb-2">
            <span className="font-semibold">Tag: </span>
            {post?.tags?.map((tag: TagI, index: number) => (
              <Badge key={index}>{tag.name}</Badge>
            ))}
          </div>

          {/* Related posts */}
          {relatedPosts?.length ? (
            <div className="mt-8 rounded-lg pr-6 py-4">
              <h2 className="text-md mb-4 font-semibold">C?? th??? b???n quan t??m</h2>
              <ul className="list-disc pl-5">
                {relatedPosts?.length ? (
                  (relatedPosts ?? []).map(({ postId, slug, title }) => (
                    <li className="text-sm text-slate-300 font-medium mb-3" key={`${postId}-${slug}`}>
                      <Link href={`/posts/${slug}`}>
                        <a className="text-slate-400 hover:text-blue-600 transition-all duration-300">{title}</a>
                      </Link>
                    </li>
                  ))
                ) : (
                  <Empty iconSize="sm" />
                )}
              </ul>
            </div>
          ) : null}
        </div>

        <Giscus
          dataRepo="duongductrong/codestus-next-v2"
          dataRepoId="R_kgDOGwoYXQ"
          dataCategory="General"
          dataCategoryId="DIC_kwDOGwoYXc4CBO7p"
          dataMapping="title"
          dataReactionsEnabled="4"
          dataEmitMetadata="0"
          dataInputPosition="bottom"
          dataTheme="light"
          dataLang="en"
          crossorigin="anonymous"
          async={true}
        />
      </div>
    </ContainerMedium>
  );
};

// PostSlug.getInitialProps = async (ctx) => {
//   let response;
//   let post: PostI | undefined;
//   let relatedPosts: PostI[] = [];
//   let isNotFound: boolean = false;

//   const { query } = ctx;
//   const slug: any = query.slug;

//   try {
//     response = await postService.getInfo(slug, { with: "user,tag", relatedPosts: true });
//     post = response.data.post;
//     relatedPosts = response.data.related_posts;
//   } catch (e) {
//     isNotFound = true;
//   }

//   return {
//     post: post,
//     relatedPosts: relatedPosts,
//     notFound: isNotFound ?? true,
//   };
// };

export const getStaticPaths: GetStaticPaths = async ({}: GetStaticPathsContext) => {
  try {
    const response = await postService.getList({ page: 1, rowsPerPage: 999 }, {});

    const paths: string[] = response.data.posts.data.map(({ slug }) => {
      return `/posts/${slug}`;
    });

    return {
      paths: paths,
      fallback: true,
    };
  } catch (e) {
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  try {
    let response;
    let post: PostI | undefined;
    let relatedPosts: PostI[] = [];

    const { slug }: any = params;

    response = await postService.getInfo(slug, { with: "user,tag", relatedPosts: true });
    post = response.data.post;
    relatedPosts = response.data.related_posts;

    return {
      props: {
        post: post ?? {},
        relatedPosts: relatedPosts ?? [],
      },
      // 1 hours (3600 seconds) to clear cache
      revalidate: 3600,
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

PostSlug.Layout = MainLayout;

export default PostSlug;
