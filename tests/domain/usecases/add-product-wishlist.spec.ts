import { ICustomerRepository } from "@/domain/repositories/customer";
import { IWishlistRepository } from "@/domain/repositories/wishlist";
import { IProductAPIService } from "@/domain/services/api-product-service";
import { AddProductWishlistUseCase } from "@/domain/usecases/whitelist/add-product";
import { AddProductWishlistInput } from "@/domain/usecases/whitelist/add-product.input"
import { IUseCaseInput, UserCase } from "@/shared/usecases/usecase";
import { mock, MockProxy } from "jest-mock-extended";

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