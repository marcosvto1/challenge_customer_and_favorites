import { ICommand } from "@/shared/commands/command";

export class CreateCustomerCommand implements ICommand {
  validate(): void {
    throw new Error("Method not implemented.");
  }
}