import { WishlistRepository } from "@/infra/database/postgree/wishlist/wishlist.repository"

export const makeWishlistRepository = () => {
  return new WishlistRepository();
}