import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';
import UpdateCustomerUseCase from './update.customer.usecase';

const customer = CustomerFactory.createWithAddress(
  'John',
  new Address('City', 123, 'street', 'zip')
);
const input = {
  id: customer.id,
  name: 'John updated',
  address: {
    street: 'street updated',
    number: 1234,
    zip: 'zip updated',
    city: 'city updated'
  }
};
const mockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn().mockReturnValue(Promise.resolve(customer))
  };
};
describe('Unit tests for customer update use case', () => {
  it('should update a customer', async () => {
    const customerRepository = mockRepository();
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await customerUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
