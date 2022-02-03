import { Notifiable } from "@/core/notifiable"
import { Email } from "@/domain/vos/email";

class ValueObject extends Notifiable {}

describe('Email Value Object', () => {
  it('should return error if email is empty', () => {
    const sut = new Email("");

    expect(sut.isValid()).toBeFalsy();
  })

  it('should return error if email is null', () => {
    const sut = new Email(null as any);

    expect(sut.isValid()).toBeFalsy();
  })

  it('should return error if email is undefined', () => {
    const sut = new Email(undefined as any);

    expect(sut.isValid()).toBeFalsy();
  })

  it('should reuturn error if email address is invalid', () => {
    const sut = new Email("mail");

    expect(sut.isValid()).toBeFalsy();
  })

  it('should return ok if email address is valid', () => {
    const sut = new Email("mail@main.com");

    expect(sut.isValid()).toBeTruthy();
  })
})