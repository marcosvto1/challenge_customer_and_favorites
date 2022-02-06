import { HttpGetClient, IHttpClient } from "./client";
import axios from 'axios'

export class AxiosClient implements IHttpClient {
  public async get({ url, params }: HttpGetClient.Params): Promise<any> {
    const result = await axios.get(url, params);
    return result;
  }
}