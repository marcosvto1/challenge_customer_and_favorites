export class Product {
  constructor(
    private readonly price: number,
    private readonly image: string,
    private readonly id: string,
    private readonly title: string,
    private readonly reviewScore: number,
  ) {}
}
