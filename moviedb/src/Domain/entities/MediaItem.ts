import { MediaItemResponse } from "../../Data/sources/remote/models/MediaItemResponse";
import { MovieGenre } from "./MovieGenre";

export interface MediaItem {
    id: number;
    posterUrl: string | null;
    adult: boolean;
    overview: string;
    releaseDate: string;
    genres: MovieGenre[];
    originalTitle: string;
    originalLanguage: string;
    title: string;
    backdropPath: string | null;
    popularity: number;
    voteCount: number;
    video: boolean;
    voteAverage: number;
};

export const genresFormatted = (genres: MovieGenre[]): string => {
    return genres.map((genre) => genre.name).join(" • ");
};

export const yearRelease = (releaseDate: string): string => {
    return releaseDate.substring(0, releaseDate.indexOf("-"));
}

export const voteAverageFormatted = (voteAverage: number): string => {
    return voteAverage.toFixed(1);
}

export const mapMediaItemResponseToDomain = (response: MediaItemResponse, imageBaseUrl: string | null, genres: MovieGenre[]): MediaItem => {
    return {
        id: response.id,
        posterUrl: `${imageBaseUrl}original/${response.poster_path}`,
        adult: response.adult,
        overview: response.overview,
        releaseDate: response.release_date,
        genres: genres.filter((genre) => response.genre_ids.includes(genre.id)),
        originalTitle: response.original_title,
        originalLanguage: response.original_language,
        title: response.title,
        backdropPath: response.backdrop_path,
        popularity: response.popularity,
        voteCount: response.vote_count,
        video: response.video,
        voteAverage: response.vote_average
    };
}
  