import { AxiosRequestConfig } from "axios";
import axiosInstance, { AxiosHttpError, AxiosHttpResponse } from "./axiosInstance";
import { TagI } from "./tagService";
import { UserI } from "./userService";

export interface PostI {
  postId?: number | string;
  title?: string;
  views?: number;
  thumbnail?: string;
  slug?: string;
  description?: string;
  content?: string;
  content_html?: string;
  userId?: number | string;
  status?: number;
  created_at?: string;
  updated_at?: string;
  publish_at?: string;
  tags?: TagI[];
  table_of_contents: any[];
  user?: UserI;
}

export interface HttpGetPostsListResponse {
  posts: { current_page: number; data: PostI[]; from: number; per_page: number; to: number };
  total: number;
}

export interface HttpGetPostInfoResponse {
  post: PostI;
  related_posts: PostI[];
}

class PostService {
  /**
   * @description Get list posts
   * @returns
   */
  async getList(
    queryParams: {
      page?: number;
      rowsPerPage?: number;
      search?: string;
      with?: string | string[];
      orderBy?: string;
    } = { with: "tags" },
    config: AxiosRequestConfig<any>
  ) {
    try {
      const response: AxiosHttpResponse<HttpGetPostsListResponse> = await axiosInstance.get("/posts", {
        ...config,
        params: { ...queryParams } ?? {},
      });

      return response.data;
    } catch (e: any) {
      const _error: AxiosHttpError = e;
      return Promise.reject(_error);
    }
  }

  async getInfo(
    slug?: string,
    queryParams: { with?: string; genTableOfContents?: boolean; relatedPosts?: boolean } = {
      genTableOfContents: true,
      with: "tag,user",
      relatedPosts: false,
    }
  ) {
    try {
      const response: AxiosHttpResponse<HttpGetPostInfoResponse> = await axiosInstance.get(`/posts/${slug}`, {
        params: { genTableOfContents: true, ...(queryParams ?? {}) },
      });

      return response.data;
    } catch (e: any) {
      const error: AxiosHttpError = e;
      return Promise.reject(error);
    }
  }
}

const postService = new PostService();

export default postService;
