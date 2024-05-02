import Customer from '../../../domain/customer/entity/customer';

export default interface InputCreateCustomerDTO {
  name: string;
  address: {
    street: string;
    city: string;
    number: number;
    zip: string;
  };
}

export interface OutputCreateCustomerDTO {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    number: number;
    zip: string;
  };
}
