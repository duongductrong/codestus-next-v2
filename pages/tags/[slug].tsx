import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { FaArrowDown, FaCode, FaHtml5, FaJs, FaLaravel, FaNodeJs, FaReact, FaVuejs } from "react-icons/fa";
import Card from "../../components/Card/Card";
import ContainerMedium from "../../components/Container/ContainerMedium";
import Empty from "../../components/Empty/Empty";
import IconButton from "../../components/Icon/IconButton";
import NextSeoCustom from "../../components/NextSeo/NextSeoCustom";
import Skeleton from "../../components/Skeleton/Skeleton";
import Typography from "../../components/Typography/Typography";
import { PostI } from "../../core/services/postService";
import tagService, { TagI } from "../../core/services/tagService";
import useTag from "../../hooks/useTag";
import MainLayout from "../../Layout/MainLayout";
// import Image from "next/image";
// import StaticAvatar from "../../public/statics/avatar.png";
import { NextPageWithLayout } from "../_app";

export interface GetServerSideParams {
  slug?: string;
}

export interface GetServerSideQuery {
  page?: number;
}

export interface PostTagProps {
  tag: TagI;
  posts: PostI[];

  paginate: {
    page: number;
    totalPagesOfPosts: number;
  };
}

const PostTag: NextPageWithLayout<PostTagProps> = ({ tag, posts, paginate }) => {
  const { asPath } = useRouter();
  const {
    loading,
    posts: _posts,
    outOfData,
    preFetchPosts,
  } = useTag({ page: paginate.page, slug: tag.slug, defaultPosts: posts, defaultTag: tag });

  const onLoadInfinitePosts = () => {
    preFetchPosts();

    setTimeout(() => {
      window.scrollTo({
        behavior: "smooth",
        top: (window.pageYOffset ?? 0) + 500,
      });
    }, 0);
  };

  return (
    <Fragment>
      <NextSeoCustom title={tag.name} description={tag.description} url={asPath} />

      {/* <div className="text-center mb-4 flex items-center justify-center flex-wrap">
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
      </div> */}

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
        {_posts.length ? (
          _posts.map(
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

        {/* Bot read navigation It's great for SEO content */}
        <nav role="navigation" aria-label="Pagination navigate" className="hidden">
          <ul>
            {Array(paginate.totalPagesOfPosts)
              .fill(0)
              .map((item, index) => {
                const page = index + 1;
                return (
                  <li key={index}>
                    <Link href={`/tags/${tag.slug}?page=${page}`}>
                      <a
                        aria-current={paginate.page === page}
                        aria-label={paginate.page !== page ? `Go to page ${page}` : `Current page, page ${page}`}>
                        {page}
                      </a>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </nav>

        {loading && <Skeleton.Card bgTransparent={true} />}
      </ContainerMedium>

      {!outOfData && (
        <section className="text-center">
          <IconButton onClick={onLoadInfinitePosts} className="animate-bounce">
            <FaArrowDown />
          </IconButton>
        </section>
      )}
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const query: GetServerSideQuery = context.query;
    const { slug } = context.params as GetServerSideParams;
    const paginate: { page?: number; totalPagesOfPosts?: number } = {
      page: Number(query.page ?? 1),
      totalPagesOfPosts: 0,
    };

    const { data } = await tagService.getTag(slug, {
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
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

PostTag.Layout = MainLayout;

export default PostTag;
