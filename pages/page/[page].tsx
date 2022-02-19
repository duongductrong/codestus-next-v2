/* eslint-disable react/no-unescaped-entities */
import classNames from "classnames";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { HomeProps } from "..";
import Badge from "../../components/Badge/Badge";
import Card from "../../components/Card/Card";
import ContainerMedium from "../../components/Container/ContainerMedium";
import Empty from "../../components/Empty/Empty";
import NextSeoCustom from "../../components/NextSeo/NextSeoCustom";
import Skeleton from "../../components/Skeleton/Skeleton";
import Typography from "../../components/Typography/Typography";
import { HttpResponseApi } from "../../core/services/axiosInstance";
import postService, { HttpGetPostsListResponse, PostI } from "../../core/services/postService";
import tagService, { HttpGetTagsResponse, TagI } from "../../core/services/tagService";
import usePosts from "../../hooks/usePosts";
import MainLayout from "../../Layout/MainLayout";
import StaticAvatar from "../../public/statics/avatar.png";
import { NextPageWithLayout } from "../_app";

export interface PagesProps extends HomeProps {}

const Pages: NextPageWithLayout<PagesProps> = ({
  posts = [],
  tags = [],
  paginate = { currentPage: 1, totalPages: 0 },
}) => {
  const colors = [
    { text: "text-purple-600", bg: "bg-purple-100" },
    { text: "text-blue-600", bg: "bg-blue-100" },
    { text: "text-pink-600", bg: "bg-pink-100" },
    { text: "text-rose-600", bg: "bg-rose-100" },
    { text: "text-cyan-600", bg: "bg-cyan-100" },
    { text: "text-slate-600", bg: "bg-slate-100" },
    { text: "text-zinc-600", bg: "bg-zinc-100" },
  ];
  const { asPath } = useRouter();
  const { currentPage, totalPages } = paginate;
  const { data, loading } = usePosts({
    data: posts,
    page: currentPage ?? 1,
    rowsPerPage: 6,
  });

//   const onSearching = _.debounce((event: FormEvent<HTMLInputElement>) => {
//     const value = (event?.target as any)?.value;
//     searching(value);
//   }, 500);

  return (
    <Fragment>
      <NextSeoCustom url={asPath} />

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

      <Typography tagName="h1" variant="h2" className="text-center mb-4 font-bold">
        Blogging
      </Typography>
      <Typography tagName="p" variant="h6" className="text-center mb-4">
        All the latest posts in Codestus.com for you. <br /> To read for your knowledged.
      </Typography>

      <ContainerMedium>
        <section className="mb-12 text-center space-x-2 space-y-2 mx-auto">
          {tags.map(({ tagId, slug, name }) => {
            const color = colors[Math.floor(Math.random() * colors.length)];

            return (
              <Link key={`${tagId}-${slug}`} href={`/tags/${slug}`}>
                <a className="inline-block">
                  <Badge color="none" className={classNames(color.bg, color.text)}>
                    {name}
                  </Badge>
                </a>
              </Link>
            );
          })}
        </section>

        {/* <div className="mb-16 md:space-x-4 flex flex-wrap items-center justify-between">
          <div className="w-full mt-4 md:mt-0">
            <Input
              onChange={onSearching}
              loading={loading}
              placeholder="Nhập từ khoá tìm kiếm phù hợp và chờ đợi..."
              beforeIcon={<FaSearch />}
              size="lg"
              fullWidth
            />
          </div>
        </div> */}

        {/* responding data */}
        {loading && data.length === 0 ? (
          <Fragment>
            <Skeleton.Card bgTransparent={true} className="mb-16" />
            <Skeleton.Card bgTransparent={true} className="mb-16" />
            <Skeleton.Card bgTransparent={true} className="mb-16" />
          </Fragment>
        ) : (
          <Fragment>
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
            {/* Paginate */}
            <nav role="navigation" className="flex items-center justify-between">
              <Link href={currentPage && currentPage > 1 ? `/page/${currentPage - 1}` : `/page/1`}>
                <a className="font-bold inline-flex items-center">
                  <FaArrowLeft className="mr-2" /> Newest
                </a>
              </Link>

              <Link
                href={
                  currentPage && totalPages && (currentPage < totalPages ?? 0)
                    ? `/page/${currentPage + 1}`
                    : `/page/${currentPage}`
                }>
                <a className="font-bold inline-flex items-center">
                  Oldest <FaArrowRight className="ml-2" />
                </a>
              </Link>
            </nav>
            {/* /Paginate */}

            {loading && <Skeleton.Card bgTransparent={true} className="mb-16"></Skeleton.Card>}
          </Fragment>
        )}
      </ContainerMedium>
    </Fragment>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const rowsPerPage = 6;
    const respond = await postService.getList({ with: "tags", page: 1, rowsPerPage: rowsPerPage }, {});

    const paths = Array(Math.ceil(respond.data.total / rowsPerPage) ?? 0)
      .fill(1)
      .map((_, index) => {
        return `/page/${index + 1}`;
      });

    return {
      paths: paths,
      fallback: true,
    };
  } catch {
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  try {
    const queryPage = (params as any).page ?? 1;
    const currentPage: number = queryPage && !Number.isNaN(queryPage) ? Number(queryPage) : 1;
    const rowsPerPage = 6;

    let posts: PostI[] = [];
    let tags: TagI[] = [];
    let totalPages = 0;

    const afterFetchIndexes = {
      tag: 0,
      post: 1,
    };
    const afterAllSettled = await Promise.allSettled([
      tagService.getTags({ page: 1, rowsPerPage: 999 }),
      postService.getList({ with: "tags", page: currentPage, rowsPerPage: rowsPerPage }, {}),
    ]);

    if (afterAllSettled[afterFetchIndexes.tag].status === "fulfilled") {
      const { data }: HttpResponseApi<HttpGetTagsResponse> = (afterAllSettled[afterFetchIndexes.tag] as any).value;

      tags = data.data;
    }

    if (afterAllSettled[afterFetchIndexes.post].status === "fulfilled") {
      const { data }: HttpResponseApi<HttpGetPostsListResponse> = (afterAllSettled[afterFetchIndexes.post] as any)
        .value;

      posts = data.posts.data;
      totalPages = Math.ceil(data.total / data.posts.per_page);
    }

    return {
      props: {
        paginate: { currentPage, totalPages },
        tags,
        posts,
        notFound: false,
      },
      revalidate: 3600 / 2,
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

Pages.Layout = MainLayout;

export default Pages;
