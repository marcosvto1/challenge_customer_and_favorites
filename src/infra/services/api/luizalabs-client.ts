import { IProduct } from "@/domain/entities/product";
import { IProductAPIService } from "@/domain/services/api-product-service";
import { IHttpClient } from "@/infra/services/client/client";
import { apiConfig } from "@/main/config/api";

export class LuizalabsApiClient implements IProductAPIService {

  private readonly url = apiConfig.luizaLabs.url;

  constructor(
    private httpClient: IHttpClient
  ) {}
  
  public async findOneProduct(productId: string): Promise<IProduct> {
    console.log("request -> ",this.url);
    const path = this.url + `/${productId}/`
    const result = await this.httpClient.get({
      url: path,
      params: undefined
    });
    return result.data
  }
}