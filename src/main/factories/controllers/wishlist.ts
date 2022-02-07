import { AddProductWhitelistController } from "@/app/controllers/add-product-wishlist"
import { GetProductInWishlistController } from "@/app/controllers/get-product-in-wishlist"
import { makeAddProductInWishlist } from "@/main/factories/usecases/add-product-in-wishlist"
import { makeGetProductsInWishlist } from "@/main/factories/usecases/get-product-in-wishlist"

export const makeWishlistControllers = () => {
  return  [
    new AddProductWhitelistController(makeAddProductInWishlist()),
    new GetProductInWishlistController(makeGetProductsInWishlist())
  ]
}