import { mock, MockProxy } from "jest-mock-extended";
import { IUserRepository } from "@/domain/repositories/user";
import { IAuthService } from "@/domain/services/auth-service";
import { LoginUseCase } from "@/domain/usecases/users/login/login"
import { LoginUseCaseInput } from "@/domain/usecases/users/login/login.input"

import * as bcript from 'bcrypt';
import { IUser } from "@/domain/entities/user";
import { JWTClaim } from "@/domain/entities/jwt";

describe('login', () => {
  let userRepo: MockProxy<IUserRepository>;
  let authService: MockProxy<IAuthService>;
  let input: LoginUseCaseInput;
  let sut: LoginUseCase;
  let passwordHashed: string;
  let userSaved: IUser;
  let clain: JWTClaim;

  beforeAll(async () => {
    userRepo = mock();
    authService = mock();
    input = new LoginUseCaseInput("mail@mail.com", "any_password");
    passwordHashed = await bcript.hashSync('any_password', 12);
    console.log(passwordHashed);
    userSaved = {
      id: 1,
      name: 'any_name',
      email: "mail@mail.com",
      password: passwordHashed
    }
    userRepo.getUserByEmail.mockResolvedValue(userSaved);
    clain = {
      userId: 1,
      email: 'mail@mail.com',
      name: 'any_name'
    }
    authService.signJWT.mockReturnValue('any_token')
  })

  beforeEach(() => {
    sut = new LoginUseCase(
      authService,
      userRepo
    );
  })

  it('shoudl return error if input date is invalid', async () => {
    const inputInvalid = new LoginUseCaseInput("mail@mail.com", "");
    
    const result = await sut.execute(inputInvalid);

    expect(result.success).toBeFalsy();
  });

  it('should call findUserByEmail with correct values', async () => {
    await sut.execute(input);

    expect(userRepo.getUserByEmail).toHaveBeenCalledWith("mail@mail.com");
    expect(userRepo.getUserByEmail).toHaveBeenCalledTimes(1);
  });

  it('should return error if findUserByEmail return undefined', async () => {
    userRepo.getUserByEmail.mockResolvedValueOnce(undefined);

    const result = await sut.execute(input);

    expect(result.success).toBeFalsy();
  });

  it('should return error if findUserByEmail return invalid data', async () => {
    userRepo.getUserByEmail.mockResolvedValueOnce({
      id: undefined as any,
      name: '',
      email: '',
      password: ''
    });

    const result = await sut.execute(input);

    expect(result.success).toBeFalsy();
  });

  it('should return error if password is diferent', async () => {
    const password = await bcript.hashSync('any_password_incorrect', 12)
    userRepo.getUserByEmail.mockResolvedValueOnce({
      id: 1,
      name: 'any_name',
      email: "mail@mail.com",
      password
    });

    const result = await sut.execute(input);

    expect(result.success).toBeFalsy();
  });

  it('should call signJWT with correct params', async () => {
    await sut.execute(input);

    expect(authService.signJWT).toHaveBeenCalledWith(clain);
    expect(authService.signJWT).toHaveBeenCalledTimes(1);
  })

  it('should return accessToken if signJWT performed with successfuly', async () => {
    const result = await sut.execute(input);

    expect(result.success).toBeTruthy();
    expect(result.data).toBe('any_token')
  })
})