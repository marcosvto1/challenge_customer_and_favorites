export interface UserCase<DtoType, Result> {
  execute(input: DtoType): Promise<Result>;
}