import { GenresResponse } from "../../Data/sources/remote/models/GenresResponse";

export interface MovieGenresRepository {
    getMovieGenres(): Promise<GenresResponse>;
};