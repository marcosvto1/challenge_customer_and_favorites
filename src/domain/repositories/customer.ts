export interface ICustomerRepository {
  emailExists(email: string): Promise<boolean>;
  customerExists(id: number): Promise<boolean>
  saveCustomer(dto: SaveCustomer.Input): Promise<SaveCustomer.Output>;
  findCustomerById(id: number): Promise<FindCustomerById.Output>;
  updateCustomer(dto: UpdateCustomer.Input): Promise<UpdateCustomer.Output>;
  findAllCustomer(dto: FindAllCustomer.Input): Promise<FindAllCustomer.Output>;
  deleteCustomer(dto: DeleteCustomer.Input): Promise<DeleteCustomer.Output>;
}

export namespace EmailExists {
  export type Output = {
    id: number;
    name: string;
    email: string
  }
}

export namespace FindCustomerById {
  export type Input = number;
  export type Output = {
    id: number;
    name: string;
    email: string
  } | undefined
}

export namespace FindAllCustomer {
  export type Input = {
    page: number;
    pageSize: number
  }

  export type Output = {
    records: {
      id: number,
      name: string,
      email: string,
    }[],
    meta: {
      page: number,
      pageSize: number,
      totalPages: number,
      total: number
    }
  }
}

export namespace SaveCustomer {
  export type Input = {
    name: string;
    email: string;
  };

  export type Output = {
    id: number;
    name: string;
    email: string;
  }
}

export namespace UpdateCustomer {
  export type Input = {
    id: number;
    name: string;
    email: string;
  };

  export type Output = {
    id: number;
    name: string;
    email: string;
  } | undefined
}

export namespace DeleteCustomer {
  export type Input = number;

  export type Output = boolean;
}