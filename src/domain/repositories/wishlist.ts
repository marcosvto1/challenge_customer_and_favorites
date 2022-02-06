export interface IWishlistRepository {
  saveProductInWhishlist: (params: SaveProductInWishlist.Input) => Promise<SaveProductInWishlist.Output>;
  productAlreadyExistsInWishlist: (productId: string, customerId: number) => Promise<boolean>;
}

export namespace SaveProductInWishlist {
  export type Input = {
    productId: string,
    customerId: number
  }

  export type Output = {
    id: string,
    productId: string,
    customerId: number
  } | undefined
}
