import { Product } from "@/domain/entities/product"

describe('Product', () => {
  it('should return error if title product is not provided', () => {
    const sut = new Product('any_id', '', 10, 'any_image', 10);

    expect(sut.isValid()).toBeFalsy();
  });

  it('should return error if price is null', () => {
    const sut = new Product('any_id', 'any_name', null as any, 'any_image', 10);

    expect(sut.isValid()).toBeFalsy();
  })
  it('should return error if id is null', () => {
    const sut = new Product(null as any, 'any_name', 10, 'any_image', 10);

    expect(sut.isValid()).toBeFalsy();
  })
})