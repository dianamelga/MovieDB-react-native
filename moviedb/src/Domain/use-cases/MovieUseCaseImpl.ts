import { parseISO, getYear } from "date-fns";
import {
  MovieVideo,
  mapMovieVideoResponseToMovieVideo,
} from "../entities/MovieVideo";
import {
  PagedItems,
  mapPagedItemsResponseToPagedItems,
} from "../entities/PagedItem";
import { MovieUseCase } from "./MovieUseCase";
import { MovieRepositoryImpl } from "../../Data/repository/MovieRepository";
import { ApiConfigurationRepositoryImpl } from "../../Data/repository/ApiConfigurationRepository";
import { MovieGenresRepositoryImpl } from "../../Data/repository/MovieGenresRepository";
import {
  MovieGenre,
  mapMovieGenreResponseToMovieGenre,
} from "../entities/MovieGenre";
import { DEFAULT_LANGUAGE } from "../../Data/sources/remote/api/constants";
import { AxiosError } from "axios";

const { getUpComingMovies, getTopRatedMovies, getVideosFromMovie } =
  new MovieRepositoryImpl();
const { getApiConfiguration } = new ApiConfigurationRepositoryImpl();
const { getMovieGenres } = new MovieGenresRepositoryImpl();

export class MovieUseCaseImpl implements MovieUseCase {
  private baseImageUrl: string | null = null;
  private movieGenres: MovieGenre[] = [];

  async getUpComingMovies(): Promise<PagedItems> {
    try {
      await this.setImageBaseUrl();
      await this.getMovieGenres();

      const response = await getUpComingMovies();
      return Promise.resolve(
        mapPagedItemsResponseToPagedItems(
          response,
          this.baseImageUrl,
          this.movieGenres
        )
      );
    } catch (error) {
      const e = error as AxiosError;
      return Promise.reject(e.response?.data);
    }
  }

  async getTopRatedMovies(): Promise<PagedItems> {
    try {
      await this.setImageBaseUrl();
      await this.getMovieGenres();

      const response = await getTopRatedMovies(DEFAULT_LANGUAGE);
      return Promise.resolve(
        mapPagedItemsResponseToPagedItems(
          response,
          this.baseImageUrl,
          this.movieGenres
        )
      );
    } catch (error) {
      const e = error as AxiosError;
      return Promise.reject(e.response?.data);
    }
  }

  async getRecommendedMovies(
    language: string | null,
    yearOfRelease?: number | null
  ): Promise<PagedItems> {
    try {
      await this.setImageBaseUrl();
      await this.getMovieGenres();

      let response = await getTopRatedMovies(
        language ? language : DEFAULT_LANGUAGE
      );

      if (yearOfRelease) {
        let date: Date;
        response = {
          ...response,
          results: response.results.filter((item) => {
            date = parseISO(item.release_date);
            return !isNaN(date.getTime()) && getYear(date) === yearOfRelease;
          }),
        };
      }

      return Promise.resolve(
        mapPagedItemsResponseToPagedItems(
          response,
          this.baseImageUrl,
          this.movieGenres
        )
      );
    } catch (error) {
      const e = error as AxiosError;
      return Promise.reject(e.response?.data);
    }
  }

  async getMovieVideos(
    movieId: number,
    language: string | null
  ): Promise<MovieVideo[]> {
    try {
      const response = await getVideosFromMovie(movieId, language);
      return Promise.resolve(
        response.results.map((item) =>
          mapMovieVideoResponseToMovieVideo(item, movieId)
        )
      );
    } catch (error) {
      const e = error as AxiosError;
      return Promise.reject(e.response?.data);
    }
  }

  private setImageBaseUrl = async () => {
    if (!this.baseImageUrl) {
      this.baseImageUrl = (await getApiConfiguration()).images.base_url;
    }
  };

  private getMovieGenres = async () => {
    if (this.movieGenres.length === 0) {
      const response = await getMovieGenres().catch(() => null);
      const genres =
        response?.genres?.map((genre) =>
          mapMovieGenreResponseToMovieGenre(genre)
        ) || [];
      if (genres.length > 0) {
        this.movieGenres.push(...genres);
      }
    }
  };
}
