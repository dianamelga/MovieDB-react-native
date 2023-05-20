import { AxiosError } from "axios";

import ApiMovieGenres from "../sources/remote/api/movie-genres-api";
import { MovieGenresRepository } from "../../Domain/repositories/MovieGenresRepository";
import { GenresResponse } from "../sources/remote/models/GenresResponse";
import { API_KEY } from "../sources/remote/api/constants";

export class MovieGenresRepositoryImpl implements MovieGenresRepository {
  async getMovieGenres(): Promise<GenresResponse> {
    try {
      const response = await ApiMovieGenres.post("/movie/list", null, {
        params: {
          api_key: API_KEY,
        },
      });
      console.log(JSON.stringify(response?.data));
      return Promise.resolve(response.data as GenresResponse);
    } catch (error) {
      const e = error as AxiosError;
      console.log(JSON.stringify(e.response?.data));
      return Promise.reject(e);
    }
  }
}
