import { AxiosError } from "axios";

import ApiMovieGenres from "../sources/remote/api/movie-genres-api";
import { MovieGenresRepository } from "../../Domain/repositories/MovieGenresRepository";
import { GenresResponse } from "../sources/remote/models/GenresResponse";
import { API_KEY } from "../sources/remote/api/constants";

export class MovieGenresRepositoryImpl implements MovieGenresRepository {
  async getMovieGenres(): Promise<GenresResponse> {
    try {
      const response = await ApiMovieGenres.get("/movie/list", {
        params: {
          api_key: API_KEY,
        },
      });
      return Promise.resolve(response.data as GenresResponse);
    } catch (error) {
      const e = error as AxiosError;
      return Promise.reject(e);
    }
  }
}
