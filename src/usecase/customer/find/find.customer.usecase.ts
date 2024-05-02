import CustomerRepositoryInterface from '../../../domain/customer/repository/customer.repository.interface';
import {
  InputFindCustomerDTO,
  OutputFindCustomerDTO
} from './find.customer.interface.dto';

export default class FindCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputFindCustomerDTO): Promise<OutputFindCustomerDTO> {
    const customer = await this.customerRepository.findById(input.id);
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
