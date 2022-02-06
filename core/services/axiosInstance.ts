import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import queryString from "query-string";
import trackingService from "./trackingService";

/**
 * Defined response from api
 */
export interface HttpResponseApi<T = any> {
  message: string;
  data: T;
  http_code: number;
}

export interface HttpErrorApi<T = any> {
  message: string;
  error: T;
  http_code: number;
}

export interface AxiosHttpResponse<
  // Generic for data in ResponseData
  D = any,
  // Generic for responseData
  T = HttpResponseApi<D>
> extends AxiosResponse<T> {}

export interface AxiosHttpError<T = any> extends HttpErrorApi<T> {}

const axiosInstance = Axios.create({
  baseURL: `http://127.0.0.1:8000/api/v1/`,
  paramsSerializer: (q) => queryString.stringify(q),
});

// Interceptor every request
axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  const _config: any = {
    headers: {
      ...config.headers,
      // Defaults auto get token tracking in client-side
      "Tracking-Token": trackingService().getTokenTracking() ?? "",
    },
    ...config,
  };

  return _config;
});

// Interceptor every response
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<AxiosHttpError>) => {
    try {
      const data = error.response?.data;
      return Promise.reject(data);
    } catch (_) {
      return Promise.reject(error.response);
    }
  }
);

export default axiosInstance;
