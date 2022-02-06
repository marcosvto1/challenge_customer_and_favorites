import { IWishlist, Wishlist } from "@/domain/entities/wishlist";

export class WishlistMap {
  public static toResponse(wishlistItem: Wishlist) {
    return {
      id: wishlistItem.id,
      productId: wishlistItem.productId,
      customerId: wishlistItem.customerId
    }
  }

  public static toDomain(dto: IWishlist) {
    return new Wishlist(dto.id, dto.productId, dto.customerId);
  }
}