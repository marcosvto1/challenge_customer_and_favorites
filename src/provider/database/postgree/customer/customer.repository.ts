import { Customer } from "@/domain/entities/customer";
import { Customer as CustomerPersistency } from "./customer.entity";
import { getRepository, getConnection } from 'typeorm';
import { ICustomerRepository } from "@/domain/repositories/customer";

export class CustomerRepository implements ICustomerRepository {
  
  async emailExists(email: string): Promise<boolean> {
    const repository = getConnection('default').getRepository(CustomerPersistency)
    const result = await repository.findOne({
      email
    });
    return !!result === true;
  }
  
  async saveCustomer(customerDto: Customer): Promise<Customer> {
    const repository = getConnection('default').getRepository(CustomerPersistency)
    const customerInstance = repository.create({
      name: customerDto.getNome(),
      email: customerDto.getEmail().getValue()
    });
    const result = await repository.save(customerInstance);
    customerDto.setId(result.id);
    return customerDto;
  }
}