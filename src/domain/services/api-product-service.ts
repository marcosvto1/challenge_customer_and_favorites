export interface IProductAPIService {
  productExists: (id: string) => Promise<boolean>;
}