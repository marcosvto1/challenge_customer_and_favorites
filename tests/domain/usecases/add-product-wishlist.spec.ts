import { Notifiable, Notification } from "@/core";
import { WishlistMap } from "@/domain/mappers/wishlistMap";
import { ICustomerRepository } from "@/domain/repositories/customer";
import { AddProductWishlistInput } from "@/domain/usecases/whitelist/add-product.input"
import { Result } from "@/shared/results/result";
import { IUseCaseInput, IUseCaseOutput, UserCase } from "@/shared/usecases/usecase";
import { mock, MockProxy } from "jest-mock-extended";

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
      const existsProduct = await this.productApiService.productExists(input.productId);
      if (!existsProduct) {
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

      const resultSaveProduct = await this.whishListRepository.saveProductInWhishlist({
        productId: input.productId,
        customerId: input.customerId
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

export interface IProductAPIService {
  productExists: (id: string) => Promise<boolean>;
}

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

describe('AddProductToWishList', () => {

  let productApiService: MockProxy<IProductAPIService>;
  let customerRepository: MockProxy<ICustomerRepository>;
  let wishlistRepository: MockProxy<IWishlistRepository>;
  let input: IUseCaseInput;
  let sut: UserCase;
  const customerId = 1;
  const productId = "0068e0da-5b3d-47aa-a48c-1c434c5cf8a5"
  const productInWishlistSaved = {
    id: '1068e0da-5b3d-47aa-a48c-1c434c5cf8a1',
    customerId: customerId,
    productId: productId
  }

  beforeAll(() => {
    productApiService = mock();
    customerRepository = mock();
    wishlistRepository = mock();
    input = new AddProductWishlistInput(productId, customerId);
    customerRepository.customerExists.mockResolvedValue(true);
    productApiService.productExists.mockResolvedValue(true);
    wishlistRepository.productAlreadyExistsInWishlist.mockResolvedValueOnce(false)
    wishlistRepository.saveProductInWhishlist.mockResolvedValue(productInWishlistSaved);
  });

  beforeEach(() => {
    sut = new AddProductWishlistUseCase(customerRepository, wishlistRepository, productApiService);
  });

  it('should return error if input date is invalid', async () => {
    const input = new AddProductWishlistInput("", "" as any);

    const result = await sut.execute(input)

    expect(result.success).toBeFalsy();
  });

  it('should call customerIdExists with correct customerId', async () => {
    await sut.execute(input);

    expect(customerRepository.customerExists).toHaveBeenCalledWith(customerId);
    expect(customerRepository.customerExists).toHaveBeenCalledTimes(1)
  });

  it('should return error if customerIdExists returns false', async () => {
    customerRepository.customerExists.mockResolvedValueOnce(false);
    const result = await sut.execute(input);

    expect(result.success).toBeFalsy()
  });

  it('should call productExists with correct params', async () => {
    await sut.execute(input);

    expect(productApiService.productExists).toHaveBeenCalledWith(productId)
    expect(productApiService.productExists).toHaveBeenCalledTimes(1)
  });

  it('should return error if productExists return false', async () => {
    productApiService.productExists.mockResolvedValueOnce(false);

    const result = await sut.execute(input);

    expect(result.success).toBeFalsy();
  });

  it('should call productAlreadyExistsInWishlist with correct params', async () => {
    await sut.execute(input);

    expect(wishlistRepository.productAlreadyExistsInWishlist).toHaveBeenCalledWith(productId, customerId)
    expect(wishlistRepository.productAlreadyExistsInWishlist).toHaveBeenCalledTimes(1)
  });

  it('should return error if productAlreadyExistsInWishlist return true', async () => {
    wishlistRepository.productAlreadyExistsInWishlist.mockResolvedValueOnce(true)

    const result = await sut.execute(input);

    expect(result.success).toBeFalsy();
  });

  it('should call saveProductInWishlist with correct params', async () => {
    await sut.execute(input);

    expect(wishlistRepository.saveProductInWhishlist).toHaveBeenCalledWith({
      productId,
      customerId
    })
    expect(wishlistRepository.saveProductInWhishlist).toHaveBeenCalledTimes(1)
  });

  it('should return error if saveProductInWishlist returns undefined', async () => {
    wishlistRepository.saveProductInWhishlist.mockResolvedValueOnce(undefined);

    const result = await sut.execute(input);

    expect(result.success).toBeFalsy();
  });

  it('should return error if saveProductInWishlist throws', async () => {
    wishlistRepository.saveProductInWhishlist.mockRejectedValueOnce(new Error('any_error'));

    const result = await sut.execute(input);

    expect(result.success).toBeFalsy();
  });

  it('should return error if saveProductInWishlist return invalid data', async () => {
    wishlistRepository.saveProductInWhishlist.mockResolvedValueOnce({
      ...productInWishlistSaved,
      id: 'any_id'
    });

    const result = await sut.execute(input);

    expect(result.success).toBeFalsy();
  });

  it('should return success if saveProductInWishlist successfuly', async () => {
    const result = await sut.execute(input);

    expect(result.success).toBeTruthy();
    expect(result.data).toEqual(productInWishlistSaved);
  });
})