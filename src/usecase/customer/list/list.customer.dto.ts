export default interface InputListCustomerDTO {}

type Customer = {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  };
};

export interface OutputListCustomerDTO {
  customers: Customer[];
}
