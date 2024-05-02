import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository';
import Address from '../../../domain/customer/value-object/address';
import Customer from '../../../domain/customer/entity/customer';
import FindCustomerUseCase from './find.customer.usecase';

describe('Test find customer use case', () => {
  const customer = new Customer('123', 'Jhon');
  const address = new Address('Aqa', 123, 'Street', '123');
  customer.changeAddress(address);

  const mockRepository = () => {
    return {
      findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn()
    };
  };
  it('should find a customer', async () => {
    const customerRepository = mockRepository();
    const useCase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: '123'
    };
    const output = {
      id: '123',
      name: 'Jhon',
      address: {
        street: 'Street',
        city: 'Aqa',
        number: 123,
        zip: '123'
      }
    };
    const result = await useCase.execute(input);
    expect(result).toEqual(output);
  });

  it('should not find a customer', () => {
    const customerRepository = mockRepository();
    customerRepository.findById.mockImplementation(() => {
      throw new Error('Customer not found');
    });
    const useCase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: '123'
    };
    expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow('Customer not found');
  });
});
