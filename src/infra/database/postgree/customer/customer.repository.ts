import { getConnection } from 'typeorm';
import { Customer as CustomerPersistency } from "./customer.entity";
import { FindAllCustomer, FindCustomerById, ICustomerRepository, SaveCustomer, UpdateCustomer } from "@/domain/repositories/customer";

enum Paginate {
  MAX_PER_PAGE=1,
  DEFAULT_PAGE=1
}

export class CustomerRepository implements ICustomerRepository {
  async findAllCustomer(dto: FindAllCustomer.Input): Promise<FindAllCustomer.Output> {
    const repository = getConnection('default').getRepository(CustomerPersistency);

    const page = dto.page ? dto.page : Paginate.DEFAULT_PAGE;
    const take = dto.pageSize ? dto.pageSize : Paginate.MAX_PER_PAGE;
    const skip = (page - 1) * take;

    const result = await repository.find({
      take,
      skip
    });

    const countAll = await repository.count();

    const totalPages = Math.ceil(countAll / take);

    return {
      records: result,
      meta: {
        page: page,
        pageSize: take,
        totalPages,
        total: countAll
      }
    }
  }

  async findCustomerById(id: number): Promise<FindCustomerById.Output> {
    const repository = getConnection('default').getRepository(CustomerPersistency);
    const result = await repository.findOne(id);
    if (result) {
      return {
        ...result
      }
    }
  }

  async updateCustomer(dto: UpdateCustomer.Input): Promise<UpdateCustomer.Output> {
    const repository = getConnection('default').getRepository(CustomerPersistency);

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
    const repository = getConnection('default').getRepository(CustomerPersistency);
    const result = await repository.findOne({
      email
    });
    return !!result === true;
  }
  
  async saveCustomer({ name , email }: SaveCustomer.Input): Promise<SaveCustomer.Output> {
    const repository = getConnection('default').getRepository(CustomerPersistency);
    const customerInstance = repository.create({
      name,
      email
    });
    const result = await repository.save(customerInstance);

    return {
      ...result
    };
  }

  async deleteCustomer(id: number): Promise<boolean> {
    const repository = getConnection('default').getRepository(CustomerPersistency);
    const result = await repository.delete(id);
    return result.affected === 1
  }
}