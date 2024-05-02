import Customer from '../../../domain/customer/entity/customer';
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer.repository.interface';
import InputListCustomerDTO, {
  OutputListCustomerDTO
} from './list.customer.dto';

export default class ListCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputListCustomerDTO): Promise<OutputListCustomerDTO> {
    const customers = await this.customerRepository.findAll();
    return OutputMapper.toOutput(customers);
  }
}
class OutputMapper {
  static toOutput(customer: Customer[]): OutputListCustomerDTO {
    return {
      customers: customer.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.Address.street,
          number: customer.Address.number,
          zip: customer.Address.zipcode,
          city: customer.Address.city
        }
      }))
    };
  }
}
