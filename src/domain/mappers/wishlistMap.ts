import { IProduct, Product } from "@/domain/entities/product";
import { IWishlist, Wishlist } from "@/domain/entities/wishlist";

export type IWishlistWithProduct = IWishlist & Omit<IProduct, "id">

export class WishlistMap {
  public static toResponse(wishlistItem: Wishlist) {
    return {
      id: wishlistItem.id,
      productId: wishlistItem.product.id,
      customerId: wishlistItem.customerId,
      title: wishlistItem.product.title,
      price: wishlistItem.product.price,
      image: wishlistItem.product.image,
      reviewScore: wishlistItem.product.reviewScore
    }
  }

  public static toDomain(dto: IWishlistWithProduct) {
    const product = new Product(
      dto.productId,
      dto.title,
      dto.price,
      dto.image,
      dto.reviewScore
    );
    return new Wishlist(dto.id, dto.productId, dto.customerId, product);
  }
}