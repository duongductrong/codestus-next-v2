import { useEffect, useRef, useState } from "react";
import { PostI } from "../core/services/postService";
import tagService, { TagI } from "../core/services/tagService";

function useTag({
  slug,
  page,
  rowsPerPage,

  defaultTag,
  defaultPosts,
}: {
  slug?: string;
  page?: number;
  rowsPerPage?: number;

  defaultTag?: TagI;
  defaultPosts?: PostI[];
}) {
  const computed = useRef({ afterInit: false, prevSlug: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [paginate, setPaginate] = useState<{ page: number; rowsPerPage: number; outOfData: boolean }>({
    page: page ?? 1,
    rowsPerPage: rowsPerPage ?? 4,
    outOfData: false,
  });
  const [tag, setTag] = useState<TagI | null>(defaultTag ?? {});
  const [posts, setPosts] = useState<PostI[]>(defaultPosts ?? []);

  const preFetchPosts = () => {
    setPaginate((prevState) => ({
      ...prevState,
      page: prevState.page + 1,
    }));
  };

  // When prevSlug diff with current-slug, it's meaning a new state tag was created
  // We should set new default value tag, posts
  const onResetPostsWithAfterInit = () => {
    computed.current.afterInit = false;
    setPosts(() => [...(defaultPosts ?? [])]);
    setTag(() => tag);
  };

  useEffect(() => {
    const { prevSlug } = computed.current;

    // Perform slug only preFetch when the previous slug diff when current slug
    // When prevSlug diff with current-slug, it's meaning a new state tag was created
    // We should set new default value tag, posts
    if (prevSlug !== slug && prevSlug !== "") {
      onResetPostsWithAfterInit();
    }

    if (computed.current.afterInit && !paginate.outOfData) {
      (async () => {
        setLoading(true);

        try {
          const { data } = await tagService.getTag(slug, {
            with: ["posts"],
            orderByPosts: "desc",
            rowsPerPagePosts: paginate.rowsPerPage,
            page: paginate.page,
          });

          if (!data.posts?.data.length) {
            setPaginate((prevState) => ({
              ...prevState,
              outOfData: true,
            }));
            return;
          }

          setTag(data.tag);
          setPosts((prevState) => {
            return [...prevState, ...(data.posts?.data ?? [])];
          });
        } catch {
        } finally {
          setLoading(false);
        }
      })();
    } else {
      computed.current.afterInit = true;
      computed.current.prevSlug = slug ?? "";
    }
  }, [paginate.page, paginate.rowsPerPage, slug, paginate.outOfData]);

  return { tag, posts, loading, outOfData: paginate.outOfData, preFetchPosts };
}

export default useTag;
