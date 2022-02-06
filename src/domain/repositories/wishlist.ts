import { IProduct } from "@/domain/entities/product"
import { IWishlist } from "@/domain/entities/wishlist"

export interface IWishlistRepository {
  saveProductInWhishlist: (params: SaveProductInWishlist.Input) => Promise<SaveProductInWishlist.Output>;
  productAlreadyExistsInWishlist: (productId: string, customerId: number) => Promise<boolean>;
}

export namespace SaveProductInWishlist {
  export type Input = Omit<IWishlist, "id"> & Omit<IProduct, "id">;

  export type Output = IWishlist & Omit<IProduct, "id"> | undefined
}
