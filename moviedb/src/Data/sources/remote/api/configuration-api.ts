import axios, { InternalAxiosRequestConfig } from "axios";
import { BASE_URL } from "./constants";
import { ErrorInterceptor } from "../interceptors/ErrorInterceptor";
import { RequestInterceptor } from "../interceptors/RequestInterceptor";

const ApiConfiguration = axios.create({
  baseURL: `${BASE_URL}/configuration`,
  headers: {
    "Content-Type": "application/json",
  },
});

ApiConfiguration.interceptors.request.use(RequestInterceptor, ErrorInterceptor);

export default ApiConfiguration;
