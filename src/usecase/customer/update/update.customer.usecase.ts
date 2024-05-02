import CustomerRepositoryInterface from '../../../domain/customer/repository/customer.repository.interface';
import customerRepositoryInterface from '../../../domain/customer/repository/customer.repository.interface';
import Address from '../../../domain/customer/value-object/address';
import {
  InputUpdateCustomerDTO,
  OutputUpdateCustomerDTO
} from './update.customer.dto';

export default class UpdateCustomerUseCase {
  private customerRepository: customerRepositoryInterface;

  constructor(customerRepositoryInterface: CustomerRepositoryInterface) {
    this.customerRepository = customerRepositoryInterface;
  }

  async execute(
    input: InputUpdateCustomerDTO
  ): Promise<OutputUpdateCustomerDTO> {
    const customer = await this.customerRepository.findById(input.id);
    customer.changeName(input.name);
    customer.changeAddress(
      new Address(
        input.address.city,
        input.address.number,
        input.address.street,
        input.address.zip
      )
    );
    await this.customerRepository.update(customer);
    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        city: customer.Address.city,
        number: customer.Address.number,
        zip: customer.Address.zipcode
      }
    };
  }
}
