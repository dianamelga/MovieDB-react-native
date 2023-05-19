import { MovieVideo, mapMovieVideoResponseToMovieVideo } from "../entities/MovieVideo";
import { PagedItems, mapPagedItemsResponseToPagedItems } from "../entities/PagedItem";
import { MovieUseCase } from "./MovieUseCase";
import { MovieRepositoryImpl } from "../../Data/repository/MovieRepository";
import { MovieGenre } from "../entities/MovieGenre";
import { AxiosError } from "axios";

const { getUpComingMovies, getTopRatedMovies, getVideosFromMovie } = new MovieRepositoryImpl();

export class MovieUseCaseImpl implements MovieUseCase {
    private baseImageUrl: string | null = null;
    private movieGenres: MovieGenre[] = [];

    async getUpComingMovies(): Promise<PagedItems> {
        try {
            const response = await getUpComingMovies();
            return Promise.resolve(mapPagedItemsResponseToPagedItems(response, this.baseImageUrl, this.movieGenres));
        } catch (error) {
            const e = error as AxiosError;
            return Promise.reject(e.response?.data);
        }
    }
    
    async getTopRatedMovies(): Promise<PagedItems> {
        try {
            const response = await getTopRatedMovies(DEFAULT_LANGUAGE);
            return Promise.resolve(mapPagedItemsResponseToPagedItems(response, this.baseImageUrl, this.movieGenres));
        } catch (error) {
            const e = error as AxiosError;
            return Promise.reject(e.response?.data);
        }
    }

    async getRecommendedMovies(language: string | null, yearOfRelease: number | null): Promise<PagedItems> {
        try {
            const response = await getTopRatedMovies(language ? language : DEFAULT_LANGUAGE);
            // TODO: filter by year of release
            return Promise.resolve(mapPagedItemsResponseToPagedItems(response, this.baseImageUrl, this.movieGenres));
        } catch (error) {
            const e = error as AxiosError;
            return Promise.reject(e.response?.data);
        }
    }

    async getMovieVideos(movieId: number, language: string | null): Promise<MovieVideo[]> {
        try {
            const response = await getVideosFromMovie(movieId, language);
            return Promise.resolve(response.results.map((item) => mapMovieVideoResponseToMovieVideo(item, movieId)));
        } catch (error) {
            const e = error as AxiosError;
            return Promise.reject(e.response?.data);
        }
    }
};