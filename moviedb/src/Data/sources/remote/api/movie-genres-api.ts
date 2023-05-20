import axios from "axios";
import { BASE_URL } from "./constants";
import { RequestInterceptor } from "../interceptors/RequestInterceptor";
import { ErrorInterceptor } from "../interceptors/ErrorInterceptor";

const ApiMovieGenres = axios.create({
  baseURL: `${BASE_URL}/genre`,
  headers: {
    "Content-Type": "application/json",
  },
});

ApiMovieGenres.interceptors.request.use(RequestInterceptor, ErrorInterceptor);

export default ApiMovieGenres;
