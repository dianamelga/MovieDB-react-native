import { MovieVideo } from "../entities/MovieVideo"
import { PagedItems } from "../entities/PagedItem"

export interface MovieUseCase {
    getUpComingMovies(): Promise<PagedItems>
    getTopRatedMovies(): Promise<PagedItems>
    getRecommendedMovies(language: string | null, yearOfRelease: number | null): Promise<PagedItems>
    getMovieVideos(movieId: number, language: string | null): Promise<MovieVideo[]>
};