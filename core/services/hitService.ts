import axiosInstance, { AxiosHttpError } from "./axiosInstance";

class HitService {
  async hitPost(slug: string) {
    try {
      const response = await axiosInstance.post(`/hits/posts/${slug}`);
      return response.data;
    } catch (e: any) {
      const _error: AxiosHttpError = e;

      return Promise.reject(_error);
    }
  }
}

const hitService = new HitService();

export default hitService;
