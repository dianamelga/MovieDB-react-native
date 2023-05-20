import { AxiosError } from "axios";

import ApiConfiguration from "../sources/remote/api/configuration-api";
import { ApiConfigurationRepository } from "../../Domain/repositories/ApiConfigurationRepository";
import { ApiConfigurationResponse } from "../sources/remote/models/ApiConfigurationResponse";
import { API_KEY } from "../sources/remote/api/constants";

export class ApiConfigurationRepositoryImpl
  implements ApiConfigurationRepository
{
  async getApiConfiguration(): Promise<ApiConfigurationResponse> {
    try {
      const response = await ApiConfiguration.get("", {
        params: {
          api_key: API_KEY,
        },
      });
      console.log(JSON.stringify(response.data));
      return Promise.resolve(response.data as ApiConfigurationResponse);
    } catch (error) {
      const e = error as AxiosError;
      console.log(JSON.stringify(e.response?.data));
      return Promise.reject(e);
    }
  }
}
