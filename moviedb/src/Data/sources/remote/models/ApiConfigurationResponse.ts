export interface ApiConfigurationResponse {
    images: ImageConfigurationResponse
};

export interface ImageConfigurationResponse {
    base_url: string,
    secure_base_url: string
};