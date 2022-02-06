import axiosInstance, { AxiosHttpError, AxiosHttpResponse } from "./axiosInstance";
import { PostI } from "./postService";

export interface TagI {
  tagId?: string | number;
  name?: string;
  description?: string;
  slug?: string;
  created_at?: string;
  updated_at?: string;
}

export interface HttpGetTagsResponse {
  current_page: number;
  data: TagI[];
  from: number;
  per_page: number;
  to: number;
}

export interface HttpGetTagResponse {
  tag: TagI;
  // Will show when query params exist $with query-params
  posts?: {
    current_page: number;
    data: PostI[];
    from: number;
    per_page: number;
    to: number;
  };

  totalPosts?: number;
}

class TagService {
  /**
   * @description Get list tags
   * @returns
   */
  async getTags(
    queryParams: {
      page?: number;
      rowsPerPage?: number;
      orderBy?: "desc" | "asc";
      search?: string;
      with?: string;
    } = {
      page: 1,
      rowsPerPage: 12,
      orderBy: "desc",
    }
  ) {
    try {
      const response: AxiosHttpResponse<HttpGetTagsResponse> = await axiosInstance.get("/tags", {
        params: queryParams,
      });

      return response.data;
    } catch (error: any) {
      const _error: AxiosHttpError = error;
      return Promise.reject(_error);
    }
  }

  /**
   * Get detail of tag
   * @param slug
   * @param queryParams
   * @returns Promise
   */
  async getTag(
    slug?: string,
    queryParams?: {
      with?: string | string[];
      orderByPosts?: "asc" | "desc";
      rowsPerPagePosts?: number;
      page?: number; // page posts list paginate
    }
  ) {
    try {
      const response: AxiosHttpResponse<HttpGetTagResponse> = await axiosInstance.get(`/tags/${slug}`, {
        params: { ...queryParams },
      });

      return response.data;
    } catch (e: any) {
      const _error: AxiosHttpError = e;
      return Promise.reject(_error);
    }
  }
}

const tagService = new TagService();

export default tagService;
