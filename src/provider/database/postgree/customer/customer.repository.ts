import { Customer as CustomerPersistency } from "./customer.entity";
import { getConnection } from 'typeorm';
import { FindCustomerById, ICustomerRepository, SaveCustomer, UpdateCustomer } from "@/domain/repositories/customer";

export class CustomerRepository implements ICustomerRepository {
  async findCustomerById(id: number): Promise<FindCustomerById.Output> {
    const repository = getConnection('default').getRepository(CustomerPersistency)
    const result = await repository.findOne(id);
    if (result) {
      return {
        ...result
      }
    }
  }

  async updateCustomer(dto: UpdateCustomer.Input): Promise<UpdateCustomer.Output> {
    const repository = getConnection('default').getRepository(CustomerPersistency)

    const result = await repository.update(dto.id, {
      name: dto.name,
      email: dto.email
    });

    let updatedEntity = undefined;
    if (result && result.affected && result.affected > 0) {
      updatedEntity = await this.findCustomerById(dto.id) as UpdateCustomer.Output;
    }

    return updatedEntity;
  }
  
  async emailExists(email: string): Promise<boolean> {
    const repository = getConnection('default').getRepository(CustomerPersistency)
    const result = await repository.findOne({
      email
    });
    return !!result === true;
  }
  
  async saveCustomer({ name , email }: SaveCustomer.Input): Promise<SaveCustomer.Output> {
    const repository = getConnection('default').getRepository(CustomerPersistency)
    const customerInstance = repository.create({
      name,
      email
    });
    const result = await repository.save(customerInstance);

    return {
      ...result
    };
  }
}