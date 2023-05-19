import { MovieVideosResponse } from "../../Data/sources/remote/models/MovieVideosResponse";
import { PagedItemsResponse } from "../../Data/sources/remote/models/PagedItemsResponse";

export interface MovieRepository {
    getUpComingMovies(): Promise<PagedItemsResponse>;
    getTopRatedMovies(language: string): Promise<PagedItemsResponse>;
    getVideosFromMovie(movieId: number, language: string | null): Promise<MovieVideosResponse>;
};