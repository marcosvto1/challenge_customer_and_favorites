import { ICommand } from "@/shared/commands/command";
import { ICommandResult } from "@/shared/commands/command_result";

export class CommandResult implements ICommandResult {
  constructor(
    public readonly success: boolean, 
    private readonly message: any) {}
}