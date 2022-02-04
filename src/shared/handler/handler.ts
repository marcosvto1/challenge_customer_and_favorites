import { Notifiable } from "@/core";
import { ICommand } from "@/shared/commands/command";
import { ICommandResult } from "@/shared/commands/command_result";


export interface IHandler<T extends ICommand> {
  handler: (command: T) => ICommandResult
}