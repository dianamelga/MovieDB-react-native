import axios from "axios";
import { BASE_URL } from "./constants";
import { ErrorInterceptor } from "../interceptors/ErrorInterceptor";
import { RequestInterceptor } from "../interceptors/RequestInterceptor";

const ApiMovies = axios.create({
  baseURL: `${BASE_URL}/movie`,
  headers: {
    "Content-Type": "application/json",
  },
});

ApiMovies.interceptors.request.use(RequestInterceptor, ErrorInterceptor);

export default ApiMovies;
