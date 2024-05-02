import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository';
import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/value-object/address';
import CreateCustomerUseCase from './create.customer.usecase';

describe('Create Customer integration tests', () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory',
      logging: false,
      sync: { force: true }
    });
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  }),
    afterEach(async () => {
      await sequelize.close();
    });
  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);
    const customer = new Customer('123', 'John');
    const address = new Address('Aqa', 123, 'Street', '123');
    customer.changeAddress(address);

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
});
