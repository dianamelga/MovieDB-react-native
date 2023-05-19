import { MovieVideoResponse } from "../../Data/sources/remote/models/MovieVideosResponse"

export interface MovieVideo {
    movieId: number,
    language: string,
    name: string,
    key: string,
    site: string,
    type: string,
    official: boolean,
    publishedAt: string,
    id: string
};

export const mapMovieVideoResponseToMovieVideo = (movieVideoResponse: MovieVideoResponse, movieId: number): MovieVideo => {
    return {
        movieId: movieId,
        language: movieVideoResponse.iso_639_1,
        name: movieVideoResponse.name,
        key: movieVideoResponse.key,
        site: movieVideoResponse.site,
        type: movieVideoResponse.type,
        official: movieVideoResponse.official,
        publishedAt: movieVideoResponse.published_at,
        id: movieVideoResponse.id
    };
}