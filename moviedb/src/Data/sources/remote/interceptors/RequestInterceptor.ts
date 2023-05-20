import { InternalAxiosRequestConfig } from "axios";

export const RequestInterceptor = (config: InternalAxiosRequestConfig) => {
  console.log(
    "Request:",
    config.baseURL,
    config.url,
    config.params,
    config.headers
  );
  return config;
};
