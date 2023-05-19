import { PagedItemsResponse } from "../../Data/sources/remote/models/PagedItemsResponse";
import { MediaItem, mapMediaItemResponseToDomain } from "./MediaItem";
import { MovieGenre } from "./MovieGenre";

export interface PagedItems {
    page: number,
    results: MediaItem[],
    totalResults: number,
    totalPages: number
};

export const mapPagedItemsResponseToPagedItems = (pagedItemsResponse: PagedItemsResponse, imageBaseUrl: string | null, genres: MovieGenre[]): PagedItems => {
    return {
        page: pagedItemsResponse.page,
        results: pagedItemsResponse.results.map((item) => mapMediaItemResponseToDomain(item, imageBaseUrl, genres)),
        totalResults: pagedItemsResponse.total_results,
        totalPages: pagedItemsResponse.total_pages
    }
};