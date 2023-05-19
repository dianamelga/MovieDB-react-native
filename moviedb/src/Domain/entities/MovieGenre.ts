import { GenreItemResponse } from "../../Data/sources/remote/models/GenresResponse"

export interface MovieGenre {
    id: number,
    name: string
};

export const mapMovieGenreResponseToMovieGenre = (movieGenreResponse: GenreItemResponse): MovieGenre => {
    return {
        id: movieGenreResponse.id,
        name: movieGenreResponse.name
    };
};