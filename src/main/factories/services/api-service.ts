import { LuizalabsApiClient } from "@/infra/services/api/luizalabs-client"
import { AxiosClient } from "@/infra/services/client/axios"

export const makeApiService = () => {
  const httpClient = new AxiosClient();
  return new LuizalabsApiClient(httpClient);
}