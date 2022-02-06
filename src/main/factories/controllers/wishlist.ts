import { AddProductWhitelistController } from "@/app/controllers/add-product-whitelist"
import { makeAddProductInWishlist } from "@/main/factories/usecases/add-product-in-wishlist"

export const makeWishlistControllers = () => {
  return  [
    new AddProductWhitelistController(makeAddProductInWishlist()),
  ]
}