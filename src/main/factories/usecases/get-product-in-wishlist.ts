import { GetProductsUseCase } from "@/domain/usecases/whitelist/get-products/get-products"
import { makeCustomerRepository } from "@/main/factories/repositories/create-customer"
import { makeWishlistRepository } from "@/main/factories/repositories/wishlist"

export const makeGetProductsInWishlist = () => {
  return new GetProductsUseCase(makeCustomerRepository(), makeWishlistRepository());
}