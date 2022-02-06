import { IProduct } from "@/domain/entities/product";

export interface IProductAPIService {
  findOneProduct: (id: string) => Promise<IProduct | undefined>;
}

