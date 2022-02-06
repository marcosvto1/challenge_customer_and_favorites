import { Notifiable, Notification } from "@/core";
import { Product } from "@/domain/entities/product";
import { WishlistMap } from "@/domain/mappers/wishlistMap";
import { ICustomerRepository } from "@/domain/repositories/customer";
import { IWishlistRepository } from "@/domain/repositories/wishlist";
import { IProductAPIService } from "@/domain/services/api-product-service";
import { AddProductWishlistInput } from "@/domain/usecases/whitelist/add-product.input";
import { Result } from "@/shared/results/result";
import { IUseCaseInput, IUseCaseOutput, UserCase } from "@/shared/usecases/usecase";

export class AddProductWishlistUseCase extends Notifiable implements UserCase<IUseCaseInput, IUseCaseOutput> {
  private productApiService: IProductAPIService;
  private whishListRepository: IWishlistRepository;
  private customerRepository: ICustomerRepository;

  constructor(
    customerRepository: ICustomerRepository,
    wishListRepository: IWishlistRepository,
    productApiService: IProductAPIService
  ) {
    super();
    this.customerRepository = customerRepository;
    this.whishListRepository = wishListRepository;
    this.productApiService = productApiService;
  }

  async execute(input: AddProductWishlistInput) {
    input.validate();
    if (!input.isValid()) {
      return Result.Failed(input.getNotifications());
    }

    try {
      // Verificar se existe o customer
      const existsCustomer = await this.customerRepository.customerExists(input.customerId)
      if (!existsCustomer) {
        return Result.Failed(new Notification("customerId", "customer not found"))
      }

      // Verifica se existe o product
      const productApiFound = await this.productApiService.findOneProduct(input.productId);
      if (!productApiFound) {
        return Result.Failed(new Notification("productId", "product not found"))
      }

      // Verifica se já existe o produto cadastro na wishlist do customer
      const alreadyExistsInWishlist = await this.whishListRepository.productAlreadyExistsInWishlist(
        input.productId,
        input.customerId
      );

      if (alreadyExistsInWishlist) {
        return Result.Failed(new Notification("productId", "The product alread exists in wishlist"))
      }

      const product = new Product(
          productApiFound.id, 
          productApiFound.title, 
          productApiFound.price, 
          productApiFound.image, 
          productApiFound.reviewScore)
      
      if (!product.isValid()) {
        return Result.Failed(product.getNotifications())
      }

      const resultSaveProduct = await this.whishListRepository.saveProductInWhishlist({
        productId: product.id,
        customerId: input.customerId,
        title: product.title,
        price: product.price,
        image: product.image,
        reviewScore: product.reviewScore,
      });
      if (!resultSaveProduct) {
        return Result.Failed(new Notification("AddProduct", "failed to save product in wishlist"))
      }

      const wishlistItem = WishlistMap.toDomain(resultSaveProduct);
      if (!wishlistItem.isValid()) {
        return Result.Failed(wishlistItem.getNotifications());
      }

      return Result.Ok(WishlistMap.toResponse(wishlistItem))
    } catch (err) {
      if (err instanceof Error) {
        return Result.Failed(new Notification("UnexpectedError", `${err.message}`))
      }
      return Result.Failed(new Notification("UnexpectedError", `App Error`))
    }
  }
}
