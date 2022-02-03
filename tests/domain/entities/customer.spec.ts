import { Contract } from "@/core";
import { Email } from "@/domain/vos/email";
import { Entity } from "@/shared/entities/entity";

export class Customer extends Entity {
  constructor(
    private readonly name: string,
    private readonly email: Email
  ) {
    super();

    this.addNotifications([email, new Contract().requires(name, "Customer.name", "O Campo nome é obrigatório")])
  }
}

describe('Customer', () => {
  let email: Email;
  sut: Customer;

  beforeEach(() => {
    email = new Email("any@mail.com");
  })

  it('should returns error if name is empty', () => {
    const sut = new Customer("", email);

    expect(sut)
  })

  it("should return error if email is invalid", () => {
    const emailInvalid = new Email("email");
    const sut = new Customer("any_name", emailInvalid)

    expect(sut.isValid()).toBeFalsy();
  })
 
  it("should return ok if name and email is provided", () => {
    const sut = new Customer("any_name", email)

    expect(sut.isValid()).toBeTruthy();
  })
})