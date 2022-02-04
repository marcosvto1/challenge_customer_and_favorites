import { Product } from "@/domain/entities/product"

describe('Product', () => {
  it('should return error if title product is not provided', () => {
    const sut = new Product('', 10, 'any_image', 'any_id', 10);

    expect(sut.isValid()).toBeFalsy();
  })
  it('should return error if price is null', () => {
    const sut = new Product('any_title', null as any, 'any_image', 'any_id', 10);

    expect(sut.isValid()).toBeFalsy();
  })
  it('should return error if id is null', () => {
    const sut = new Product('any_title', 10, 'any_image', null as any, 10);

    expect(sut.isValid()).toBeFalsy();
  })
})