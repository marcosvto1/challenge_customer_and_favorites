import { FindProducts, IWishlistRepository, SaveProductInWishlist } from "@/domain/repositories/wishlist";
import { Wishlist } from "@/infra/database/postgree/wishlist/wishlist.entity";
import { getConnection } from "typeorm";

export class WishlistRepository implements IWishlistRepository {
  async saveProductInWhishlist (params: SaveProductInWishlist.Input): Promise<SaveProductInWishlist.Output> {
    const repository = getConnection('default').getRepository(Wishlist);
    const wishlistCreate = repository.create(params);
    const wishlist = await repository.save(wishlistCreate);
    return wishlist;
  }

  async productAlreadyExistsInWishlist(productId: string, customerId: number): Promise<boolean> {
    const repository = getConnection('default').getRepository(Wishlist);

    const result = await repository.findOne({
      where: {
        productId,
        customerId
      }
    });
    return !!result === true;
  }

  async findProducts(customerId: number): Promise<FindProducts.Output> {
    const repository = getConnection('default').getRepository(Wishlist);
    
    const records = await repository.find({
      where: {
        customerId
      }
    });

    return { records };
  }

}