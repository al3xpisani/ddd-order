import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository';
import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/value-object/address';
import CreateCustomerUseCase from './create.customer.usecase';

describe('Create Customer integration tests', () => {
  const customer = new Customer('123', 'John');
  const address = new Address('Aqa', 123, 'Street', '123');
  customer.changeAddress(address);
  const mockCustomer = () => {
    return {
      findById: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn()
    };
  };
  it('should create a customer', async () => {
    const customerRepository = mockCustomer();
    const useCase = new CreateCustomerUseCase(customerRepository);

    const input = {
      name: 'Jhon',
      address: {
        street: 'Street',
        city: 'Aqa',
        number: 123,
        zip: '123'
      }
    };
    const output = await useCase.execute(input);
    expect(output).toEqual({
      id: expect.any(String),
      name: 'Jhon',
      address: {
        street: 'Street',
        city: 'Aqa',
        number: 123,
        zip: '123'
      }
    });
  });

  it('should throw an error when name is blank', async () => {
    const customerRepository = mockCustomer();
    const useCase = new CreateCustomerUseCase(customerRepository);

    const input = {
      name: '',
      address: {
        street: 'Street',
        city: 'Aqa',
        number: 123,
        zip: '123'
      }
    };
    await expect(useCase.execute(input)).rejects.toThrow(
      'Name cannot be empty'
    );
  });
});
