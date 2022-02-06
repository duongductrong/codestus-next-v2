/* eslint-disable react/no-unescaped-entities */
import classNames from "classnames";
import _ from "lodash";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, Fragment } from "react";
import { FaArrowDown, FaCheck, FaSearch } from "react-icons/fa";
import Badge from "../components/Badge/Badge";
import Card from "../components/Card/Card";
import ContainerMedium from "../components/Container/ContainerMedium";
import Empty from "../components/Empty/Empty";
import IconButton from "../components/Icon/IconButton";
import Input from "../components/Input/Input";
import NextSeoCustom from "../components/NextSeo/NextSeoCustom";
import Skeleton from "../components/Skeleton/Skeleton";
import Spinner from "../components/Spinner/Spinner";
import Typography from "../components/Typography/Typography";
import { HttpResponseApi } from "../core/services/axiosInstance";
import postService, { HttpGetPostsListResponse, PostI } from "../core/services/postService";
import tagService, { HttpGetTagsResponse, TagI } from "../core/services/tagService";
import trackingService from "../core/services/trackingService";
import usePosts from "../hooks/usePosts";
import MainLayout from "../Layout/MainLayout";
import StaticAvatar from "../public/statics/avatar.png";
import { NextPageWithLayout } from "./_app";

export interface HomeProps {
  posts: PostI[];
  tags: TagI[];

  paginate: {
    currentPage?: number;
    totalPages?: number;
  };
}

const Home: NextPageWithLayout<HomeProps> = ({ posts, tags, paginate }) => {
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
  const { data, error, loading, outOfData, preFetch, searching } = usePosts({
    data: posts,
    page: currentPage ?? 1,
    rowsPerPage: 12,
  });

  const onInfiniteLoadData = () => {
    preFetch();

    setTimeout(() => {
      window.scrollTo({
        behavior: "smooth",
        top: window.pageYOffset + 2000,
      });
    }, 0);
  };

  const onSearching = _.debounce((event: FormEvent<HTMLInputElement>) => {
    const value = (event?.target as any)?.value;
    searching(value);
  }, 500);

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

        <div className="mb-16 md:space-x-4 flex flex-wrap items-center justify-between">
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
        </div>

        {/* responding data */}
        {loading && data.length === 0 ? (
          <Fragment>
            <Skeleton.Card bgTransparent={true} className="mb-16" />
            <Skeleton.Card bgTransparent={true} className="mb-16" />
            <Skeleton.Card bgTransparent={true} className="mb-16" />
          </Fragment>
        ) : (
          <Fragment>
            {data.length ? (
              data.map(
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

            {/* Bot read navigation
              It's great for SEO content
            */}
            <nav role="navigation" aria-label="Pagination navigate" className="hidden">
              <ul>
                {Array(totalPages)
                  .fill(0)
                  .map((item, index) => {
                    const page = index + 1;
                    return (
                      <li key={index}>
                        <Link href={`?page=${page}`}>
                          <a
                            aria-current={currentPage === page}
                            aria-label={currentPage !== page ? `Go to page ${page}` : `Current page, page ${page}`}>
                            {page}
                          </a>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </nav>

            {loading && <Skeleton.Card bgTransparent={true} className="mb-16"></Skeleton.Card>}
          </Fragment>
        )}
      </ContainerMedium>

      <div className="text-center mb-4">
        {error && !loading && <p className="text-red-500 ">Tải bài viết mới thất bại, vui lòng thử lại.</p>}
      </div>

      {!outOfData ? (
        <div className="text-center">
          {!loading ? (
            <IconButton onClick={onInfiniteLoadData} className="animate-bounce">
              <FaArrowDown />
            </IconButton>
          ) : (
            <Spinner className="mx-auto" />
          )}
        </div>
      ) : (
        <div className="text-center">
          <IconButton className="mb-4">
            <FaCheck />
          </IconButton>
          <p className="font-semibold text-blue-600">Không còn bài viết nữa</p>
        </div>
      )}
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const currentPage: number = Number((context.query as any).page) ?? 1;

    let posts: PostI[] = [];
    let tags: TagI[] = [];
    let totalPages = 0;

    const afterFetchIndexes = {
      tag: 0,
      post: 1,
    };
    const afterAllSettled = await Promise.allSettled([
      tagService.getTags({ page: 1, rowsPerPage: 999 }),
      postService.getList(
        { with: "tags", page: currentPage },
        {
          headers: {
            "Tracking-Token": trackingService(context.req).getTokenTracking() ?? "",
          },
        }
      ),
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
      }, // will be passed to the page component as props
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

Home.Layout = MainLayout;

export default Home;
