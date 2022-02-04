import { Notifiable } from "@/core";
import { Notification } from "@/core/notification";
import { CommandResult } from "@/domain/commands/command_result";
import { CreateCustomerCommand } from "@/domain/commands/create_customer.command";
import { ICommand } from "@/shared/commands/command";
import { ICommandResult } from "@/shared/commands/command_result";
import { IHandler } from "@/shared/handler/handler";

export class CustomerHandler extends Notifiable implements IHandler<CreateCustomerCommand> {
 
  public handler (command: CreateCustomerCommand): CommandResult {
    command.validate();
    return new CommandResult(false, "Falha ao cadastrar");
  }
  
}