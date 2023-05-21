import { AxiosError } from "axios";

import ApiMovies from "../sources/remote/api/movies-api";
import { MovieRepository } from "../../Domain/repositories/MovieRepository";
import { MovieVideosResponse } from "../sources/remote/models/MovieVideosResponse";
import { PagedItemsResponse } from "../sources/remote/models/PagedItemsResponse";
import { API_KEY } from "../sources/remote/api/constants";

export class MovieRepositoryImpl implements MovieRepository {
  async getUpComingMovies(): Promise<PagedItemsResponse> {
    try {
      const response = await ApiMovies.post("/upcoming", null, {
        params: {
          api_key: API_KEY,
        },
      });
      return Promise.resolve(response.data as PagedItemsResponse);
    } catch (error) {
      let e = error as AxiosError;
      return Promise.reject(e);
    }
  }

  async getTopRatedMovies(language: string): Promise<PagedItemsResponse> {
    try {
      const response = await ApiMovies.post("/top_rated", null, {
        params: {
          api_key: API_KEY,
          language: language,
        },
      });
      return Promise.resolve(response.data as PagedItemsResponse);
    } catch (error) {
      let e = error as AxiosError;
      return Promise.reject(e);
    }
  }

  async getVideosFromMovie(
    movieId: number,
    language: string | null
  ): Promise<MovieVideosResponse> {
    try {
      const response = await ApiMovies.post(`/${movieId}/videos`, null, {
        params: {
          api_key: API_KEY,
          language: language,
        },
      });
      return Promise.resolve(response.data as MovieVideosResponse);
    } catch (error) {
      let e = error as AxiosError;
      return Promise.reject(e);
    }
  }
}
