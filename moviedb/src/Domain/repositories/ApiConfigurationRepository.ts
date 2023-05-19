import { ApiConfigurationResponse } from "../../Data/sources/remote/models/ApiConfigurationResponse";

export interface ApiConfigurationRepository {
    getApiConfiguration(): Promise<ApiConfigurationResponse>;
};
