import { AxiosError } from 'axios';

import ApiMovies from '../sources/remote/api/movies-api';
import { MovieRepository } from "../../Domain/repositories/MovieRepository";
import { MovieVideosResponse } from "../sources/remote/models/MovieVideosResponse";
import { PagedItemsResponse } from "../sources/remote/models/PagedItemsResponse";

export class MovieRepositoryImpl implements MovieRepository {

    async getUpComingMovies(): Promise<PagedItemsResponse> {
        try {
            const response = await ApiMovies.post('/upcoming', {
                params: {
                    'api_key': API_KEY
                }
            });
            console.log(JSON.stringify(response?.data));
            return Promise.resolve(response.data as PagedItemsResponse);
        } catch (error) {
            let e = error as AxiosError;
            console.log(JSON.stringify(e.response?.data));
            return Promise.reject(e.response?.data);
        }
    }

    async getTopRatedMovies(language: string): Promise<PagedItemsResponse> {
        try {
            const response = await ApiMovies.post('/top_rated', {
                params: {
                    'api_key': API_KEY,
                    'language': language
                }
            });
            console.log(JSON.stringify(response?.data));
            return Promise.resolve(response.data as PagedItemsResponse);
        } catch (error) {
            let e = error as AxiosError;
            console.log(JSON.stringify(e.response?.data));
            return Promise.reject(e.response?.data);
        }
    }

    async getVideosFromMovie(movieId: number, language: string | null): Promise<MovieVideosResponse> {
        try {
            const response = await ApiMovies.post(`/${movieId}/videos`, {
                params: {
                    'api_key': API_KEY,
                    'language': language
                }
            });
            console.log(JSON.stringify(response?.data));
            return Promise.resolve(response.data as MovieVideosResponse);
        } catch (error) {
            let e = error as AxiosError;
            console.log(JSON.stringify(e.response?.data));
            return Promise.reject(e.response?.data);
        }
    }

};