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
    productId: productId,
    title: "any_name",
    price: 10,
    image: "any_image_url"
  }

  const productAPI = {
    id: productId,
    title: "any_name",
    price: 10,
    image: "any_image_url"
  }

  beforeAll(() => {
    productApiService = mock();
    customerRepository = mock();
    wishlistRepository = mock();
    input = new AddProductWishlistInput(productId, customerId);
    customerRepository.customerExists.mockResolvedValue(true);
    productApiService.findOneProduct.mockResolvedValue(productAPI);
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

  it('should call findOneProduct with correct params', async () => {
    await sut.execute(input);

    expect(productApiService.findOneProduct).toHaveBeenCalledWith(productId)
    expect(productApiService.findOneProduct).toHaveBeenCalledTimes(1)
  });

  it('should return error if findOneProduct return undefined', async () => {
    productApiService.findOneProduct.mockResolvedValueOnce(undefined);

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
      customerId,
      title: "any_name",
      price: 10,
      image: "any_image_url"
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