import { ICustomerRepository } from "@/domain/repositories/customer";
import { IWishlistRepository } from "@/domain/repositories/wishlist";
import { GetProductsUseCase } from "@/domain/usecases/whitelist/get-products/get-products";
import { GetProductsInput } from "@/domain/usecases/whitelist/get-products/get-products.input";
import { IUseCaseInput, UserCase } from "@/shared/usecases/usecase";
import { mock, MockProxy } from "jest-mock-extended";

describe('GetProductsWishlist', () => {

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


  beforeAll(() => {
    customerRepository = mock();
    wishlistRepository = mock();
    input = new GetProductsInput(customerId);
    customerRepository.customerExists.mockResolvedValue(true);
    wishlistRepository.productAlreadyExistsInWishlist.mockResolvedValue(false)
    wishlistRepository.saveProductInWhishlist.mockResolvedValue(productInWishlistSaved);
    wishlistRepository.findProducts.mockResolvedValue({ records: [
      {
        id: '1068e0da-5b3d-47aa-a48c-1c434c5cf8a1',
        customerId: customerId,
        productId: productId,
        title: "any_name",
        price: 10,
        image: "any_image_url"
      }
    ]})
  });

  beforeEach(() => {
    sut = new GetProductsUseCase(customerRepository, wishlistRepository)
  });

  it('should return error if input date is invalid', async () => {
    const inputInvalid = new GetProductsInput("" as any);

    const result = await sut.execute(inputInvalid)

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

  it('should call findProducts with correct params', async () => {
    await sut.execute(input);

    expect(wishlistRepository.findProducts).toHaveBeenCalledWith(customerId)
    expect(wishlistRepository.findProducts).toHaveBeenCalledTimes(1)
  });

  it('should return error if findProducts throws', async () => {
    wishlistRepository.findProducts.mockRejectedValueOnce(new Error('any_error'))

    const result = await sut.execute(input);

    expect(result.success).toBeFalsy()
  });

  it('should return success if findProducts succesfuly', async () => {
    const result = await sut.execute(input);

    expect(result.success).toBeTruthy();
    expect(result.data[0]).toEqual(productInWishlistSaved)
  });

  it('should return error if findProduct returns invalid data', async () => {
    wishlistRepository.findProducts.mockResolvedValue({ records: [
      {
        id: '1068e0da-5b3d-47aa-a48c-1c434c5cf8a1',
        customerId: customerId,
        productId: productId,
        title: "",
        price: 10,
        image: "any_image_url"
      }
    ]})

    const result = await sut.execute(input)

    expect(result.success).toBeFalsy();
  })
})