export interface MovieVideosResponse {
    id: number,
    results: MovieVideoResponse[]
};

export interface MovieVideoResponse {
    iso_639_1: string, // language
    name: string,
    key: string,
    site: string,
    type: string,
    official: boolean,
    published_at: string,
    id: string
};