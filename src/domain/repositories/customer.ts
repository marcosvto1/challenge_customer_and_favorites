export interface ICustomerRepository {
  emailExists(email: string): Promise<boolean>;
  saveCustomer(dto: SaveCustomer.Input): Promise<SaveCustomer.Output>;
  findCustomerById(id: number): Promise<FindCustomerById.Output>;
  updateCustomer(dto: UpdateCustomer.Input): Promise<UpdateCustomer.Output>;
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