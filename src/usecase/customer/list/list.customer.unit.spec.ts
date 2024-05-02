import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';
import ListCustomerUseCase from './list.customer.usecase';

const customer1 = CustomerFactory.createWithAddress(
  'John',
  new Address('Aqa', 123, 'street', 'zip123')
);
const customer2 = CustomerFactory.createWithAddress(
  'Jane',
  new Address('SP', 456, 'street abc', 'zip 456')
);

const MockRepository = () => {
  return {
    create: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2]))
  };
};

describe('Unit test for list customer usecase', () => {
  it('should list customers', async () => {
    const customerRepository = MockRepository();
    const customerUseCase = new ListCustomerUseCase(customerRepository);

    const output = await customerUseCase.execute(null);

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[0].name).toBe(customer1.name);

    expect(output.customers[1].id).toBe(customer2.id);
    expect(output.customers[1].name).toBe(customer2.name);
  });
});
