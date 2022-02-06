import { Notifiable, Notification } from "@/core";
import { IWishlist, Wishlist } from "@/domain/entities/wishlist";
import { WishlistMap } from "@/domain/mappers/wishlistMap";
import { ICustomerRepository } from "@/domain/repositories/customer";
import { IWishlistRepository } from "@/domain/repositories/wishlist";
import { GetProductsInput } from "@/domain/usecases/whitelist/get-products/get-products.input";
import { Result } from "@/shared/results/result";
import { IUseCaseInput, IUseCaseOutput, UserCase } from "@/shared/usecases/usecase";

export class GetProductsUseCase extends Notifiable implements UserCase<IUseCaseInput, IUseCaseOutput> {
  private readonly customerRepository: ICustomerRepository
  private readonly wishlistRepository: IWishlistRepository;

  constructor(
    customerRepository: ICustomerRepository,
    wishlistRepository: IWishlistRepository
    ) {
    super();
    this.customerRepository = customerRepository;
    this.wishlistRepository = wishlistRepository;
  }

  async execute(input: GetProductsInput) {
    input.validate();
    if (!input.isValid()) {
      return Result.Failed(input.getNotifications())
    }

     // Verificar se existe o customer
    const existsCustomer = await this.customerRepository.customerExists(input.customerId)
    if (!existsCustomer) {
      return Result.Failed(new Notification("customerId", "customer not found"))
    }
    try {
      const result = await this.wishlistRepository.findProducts(input.customerId);
      const wishlistItems: IWishlist[] = [];
      if (result.records) {
        for (const record of result.records) {
          const wishlistItem = WishlistMap.toDomain(record);
          if (!wishlistItem.isValid()) {
            return Result.Failed(wishlistItem.getNotifications())
          }
          wishlistItems.push(WishlistMap.toResponse(wishlistItem));
        }
      }
      return Result.Ok(wishlistItems);
    } catch (error) {
      if (error instanceof Error) {
        return Result.Failed(new Notification("UnexpectedError", `${error.message}`))
      }
      return Result.Failed(new Notification("UnexpectedError", `App Error`))
    }
  }
}