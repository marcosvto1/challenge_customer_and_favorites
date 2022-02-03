import { Customer } from "@/domain/entities/customer";
import { Email } from "@/domain/vos/email";

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