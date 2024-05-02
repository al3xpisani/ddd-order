import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository';
import Address from '../../../domain/customer/value-object/address';
import Customer from '../../../domain/customer/entity/customer';
import FindCustomerUseCase from './find.customer.usecase';

describe('Test find customer use case', () => {
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

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository();
    const useCase = new FindCustomerUseCase(customerRepository);
    const customer = new Customer('123', 'Jhon');
    const address = new Address('Aqa', 123, 'Street', '123');
    customer.changeAddress(address);
    await customerRepository.create(customer);

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
});
