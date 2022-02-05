import { IStandardResult } from "@/shared/results/result";

export type IUseCaseOutput<T = any> = IStandardResult<T>;
export interface UserCase<IInput = IUseCaseInput, IOutput = IUseCaseOutput> {
  execute(input: IInput): Promise<IOutput> | IOutput;
}

export interface IUseCaseInput {
  validate(): void
}

