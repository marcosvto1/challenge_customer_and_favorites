import { AddProductWishlistUseCase } from "@/domain/usecases/whitelist/add-product"
import { makeCustomerRepository } from "@/main/factories/repositories/create-customer"
import { makeWishlistRepository } from "@/main/factories/repositories/wishlist"
import { makeApiService } from "@/main/factories/services/api-service"

export const makeAddProductInWishlist = () => {
  return new AddProductWishlistUseCase(makeCustomerRepository(), makeWishlistRepository(), makeApiService())
}