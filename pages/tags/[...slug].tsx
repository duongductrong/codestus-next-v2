import { AxiosResponse } from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import { FaCode, FaHtml5, FaJs, FaLaravel, FaNodeJs, FaReact, FaVuejs } from "react-icons/fa";
import Card from "../../components/Card/Card";
import ContainerMedium from "../../components/Container/ContainerMedium";
import Empty from "../../components/Empty/Empty";
import NextSeoCustom from "../../components/NextSeo/NextSeoCustom";
import Pagination from "../../components/Pagination/Pagination";
import Typography from "../../components/Typography/Typography";
import { PostI } from "../../core/services/postService";
import tagService, { HttpGetTagResponse, TagI } from "../../core/services/tagService";
import useApp from "../../hooks/useApp";
import MainLayout from "../../Layout/MainLayout";
import { NextPageWithLayout } from "../_app";
import StaticAvatar from "../../public/statics/avatar.png";

export interface GetServerSideParams {
  slug?: string | string[];
}

export interface GetServerSideQuery {
  page?: number;
}

export interface PostTagProps {
  tag: TagI;
  posts: PostI[];

  paginate: {
    page?: number;
    totalPagesOfPosts?: number;
  };

  notFound?: boolean;
}

const PostTag: NextPageWithLayout<PostTagProps> = ({ tag, posts, paginate }) => {
  const { getCanonicalUrl } = useApp();

  return (
    <Fragment>
      <NextSeoCustom title={tag.name} description={tag.description} url={getCanonicalUrl()} />

      <div className="text-center mb-4 flex items-center justify-center flex-wrap">
        <Link href={"/"}>
          <a>
            <Image
              src={StaticAvatar}
              width={300}
              height={300}
              className="object-cover mx-auto rounded-full bg-gradient-to-tr from-blue-400 to-blue-700"
              alt="Logo"
            />
          </a>
        </Link>
      </div>

      <div className="text-center mb-4 flex items-center justify-center flex-wrap">
        {tag.name?.toLowerCase().includes("react") ? (
          <FaReact size={48} />
        ) : tag.name?.toLowerCase().includes("vue") ? (
          <FaVuejs size={48} />
        ) : tag.name?.toLowerCase().includes("laravel") ? (
          <FaLaravel size={48} />
        ) : tag.name?.toLowerCase().includes("node") || tag.name?.toLowerCase().includes("nodejs") ? (
          <FaNodeJs size={48} />
        ) : tag.name?.toLowerCase().includes("javascript") || tag.name?.toLowerCase().includes("js") ? (
          <FaJs size={48} />
        ) : tag.name?.toLowerCase().includes("html") || tag.name?.toLowerCase().includes("css") ? (
          <FaHtml5 size={48} />
        ) : (
          <FaCode size={48} />
        )}
      </div>

      <Typography tagName="h1" variant="h2" className="text-center mb-4 font-bold">
        {tag.name}
      </Typography>
      <Typography tagName="p" variant="h6" className="text-center mb-4 mx-auto" style={{ maxWidth: "800px" }}>
        {tag.description ? tag.description : `All the latest posts about ${tag.name}`}
      </Typography>

      <ContainerMedium className="mt-16">
        {posts.length ? (
          posts.map(
            ({ postId, title, description, views, slug, created_at: createdAt, publish_at: publishAt, tags }) => (
              <Card
                title={title}
                description={description}
                countViewer={views}
                slug={slug}
                className="mb-20"
                createdAt={publishAt ?? createdAt}
                key={`${postId?.toString()}${createdAt?.toString()}`}
                tag={tags?.map((item: any) => item.tag)}
              />
            )
          )
        ) : (
          <Empty />
        )}

        <Pagination.Simple
          align="right"
          currentPage={paginate.page}
          totalPages={paginate.totalPagesOfPosts}
          prefix={`/tags/${tag.slug}`}></Pagination.Simple>

        {/* {loading && <Skeleton.Card bgTransparent={true} />} */}
      </ContainerMedium>
    </Fragment>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const paths: string[] = [];
    const getTags = await tagService.getTags();

    const allTagPaths: string[] = getTags.data.data.map((tag) => {
      return tag.slug as string;
    });

    const allSettledTag = await Promise.allSettled(
      allTagPaths.map((slug) => {
        return tagService.getTag(slug, {
          with: ["posts"],
        });
      })
    );

    allSettledTag.map((tag) => {
      if (tag.status === "fulfilled") {
        const _tag: AxiosResponse<HttpGetTagResponse> = tag.value as any;

        const { tag: __tag, totalPosts } = _tag.data;

        paths.push(`/tags/${__tag.slug}`);

        Array(totalPosts ?? 1)
          .fill(1)
          .map((_, index) => paths.push(`/tags/${__tag.slug}/${index + 1}`));
      }
    });

    return {
      paths,
      fallback: true,
    };
  } catch {
    return {
      fallback: "blocking",
      paths: [],
    };
  }
};

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
  try {
    const query: any = ctx.params;
    const { slug } = query as GetServerSideParams;

    const _slug: string | undefined = Array.isArray(slug) ? slug[0] : slug;
    const _page: number = Array.isArray(slug) ? Number(slug[1] ?? 1) : 1;

    const paginate: { page?: number; totalPagesOfPosts?: number } = {
      page: Number(_page ?? 1),
      totalPagesOfPosts: 0,
    };

    const { data } = await tagService.getTag(_slug, {
      page: paginate.page,
      with: ["posts"],
    });

    paginate.totalPagesOfPosts = Math.ceil((data.totalPosts ?? 0) / (data.posts?.per_page ?? 0)) ?? 0;

    return {
      props: {
        tag: data.tag,
        posts: data.posts?.data ?? [],
        paginate,
      },
      notFound: false,
      revalidate: 3600,
    };
  } catch {
    return {
      props: {
        tag: {},
        posts: [],
        paginate: {
          page: 1,
          totalPagesOfPosts: 0,
        },
      },
      notFound: true,
    };
  }
};

PostTag.Layout = MainLayout;

export default PostTag;
