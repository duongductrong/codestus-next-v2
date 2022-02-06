// @todo [x] Fix the error duplicate fetching data both server and client side

import { useEffect, useRef, useState } from "react";
import postService, { PostI } from "../core/services/postService";

export interface useHookPostI {
  page?: number;
  rowsPerPage?: number;
  search?: string;
  data?: PostI[];
}

function usePosts({ data: initializeData = [], page, rowsPerPage, search }: useHookPostI) {
  const computedRef = useRef({ afterInit: false });
  const [computed, setComputed] = useState<{ outOfData: boolean /* prevSearch?: string */ }>({
    outOfData: false,
    /* prevSearch: undefined, */
  });
  const [paginate, setPaginate] = useState({ page: page ?? 1, rowsPerPage: rowsPerPage ?? 12, search: search ?? "" });
  const [data, setData] = useState<PostI[]>(initializeData);
  const [error, setError] = useState<any>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // The function support change paginate to pre-fetch
  const preFetch = () => {
    // Only fetch when should-fetch variable is passed
    if (!computed.outOfData) {
      setPaginate((prevState) => ({
        ...prevState,
        page: prevState.page + 1,
      }));
    }
  };

  // The function listen query-search and change it
  const searching = (q?: string) => {
    setComputed((prevState) => ({ ...prevState, outOfData: false }));
    setData(() => []);
    setPaginate((prevState) => ({
      ...prevState,
      page: 1,
      search: q ?? "",
    }));
  };

  useEffect(() => {
    // Only fetch when should-fetch variable is passed
    const controller = new AbortController();
    if (!computed.outOfData && computedRef.current.afterInit) {
      setLoading(true);

      (async () => {
        try {
          const response = await postService.getList(
            {
              page: paginate.page,
              rowsPerPage: paginate.rowsPerPage,
              search: paginate.search,
              with: ["tags"],
            },
            { signal: controller.signal }
          );

          const posts: PostI[] = response.data.posts.data;

          if (posts.length === 0) {
            setComputed((prevState) => ({ ...prevState, outOfData: true }));
            return;
          }

          // set new data
          setData((prevState) => {
            return [...prevState, ...posts];
          });
        } catch (e) {
          setError(e);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      computedRef.current.afterInit = true;
    }

    return () => {
      controller.abort();
    };
  }, [paginate.page, paginate.rowsPerPage, paginate.search, computed.outOfData]);

  return { data, error, loading, preFetch, searching, outOfData: computed.outOfData };
}

export default usePosts;
