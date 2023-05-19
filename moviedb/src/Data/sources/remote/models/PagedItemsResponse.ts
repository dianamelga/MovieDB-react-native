import { MediaItemResponse } from "./MediaItemResponse";

export interface PagedItemsResponse {
    page: number,
    results: MediaItemResponse[],
    total_results: number,
    total_pages: number
};