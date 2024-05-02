import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer.repository.interface';
import Address from '../../../domain/customer/value-object/address';
import InputCreateCustomerDTO, {
  OutputCreateCustomerDTO
} from './create.customer.interface.dto';

export default class CreateCustomerUseCase {
  private customerRepositoryInterface: CustomerRepositoryInterface;

  constructor(customerRepositoryInterface: CustomerRepositoryInterface) {
    this.customerRepositoryInterface = customerRepositoryInterface;
  }

  async execute(
    input: InputCreateCustomerDTO
  ): Promise<OutputCreateCustomerDTO> {
    const customer = CustomerFactory.createWithAddress(
      input.name,
      new Address(
        input.address.city,
        input.address.number,
        input.address.street,
        input.address.zip
      )
    );
    await this.customerRepositoryInterface.create(customer);
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
