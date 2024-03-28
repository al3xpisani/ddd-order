import { Sequelize } from 'sequelize-typescript';
import CustomerModel from './customer.model';
import Address from '../../../../domain/customer/value-object/address';
import Customer from '../../../../domain/customer/entity/customer';
import CustomerRepository from './customer.repository';
import EventDispatcher from '../../../../domain/@shared/event/event-dispatcher';
import CustomerAddressUpdateEvent from '../../../../domain/customer/event/customer/customer-address-updated.event';
import CustomerCreatedEvent from '../../../../domain/customer/event/customer/customer-created.event';
import EnviaConsoleLogHandler from '../../../../domain/customer/event/customer/handler/envia-console-log.handler';
import EnviaConsoleLog1Handler from '../../../../domain/customer/event/customer/handler/envia-console-log1.handler';
import EnviaConsoleLog2Handler from '../../../../domain/customer/event/customer/handler/envia-console-log2.handler';

describe('Customer repository unit tests', () => {
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
  it('should create a new customer', async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address('Aqa', 123, 'rua a', 'Sao Paulo');
    const customer = new Customer('1', 'customer A');
    customer.Address = address;

    await customerRepository.create(customer);
    const customerModel = await CustomerModel.findOne({
      where: { id: '1' }
    });

    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zipcode,
      city: address.city
    });
  });
  it('should update a new customer', async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address('Aqa', 123, 'rua a', 'Sao Paulo');
    const customer = new Customer('1', 'customer A');
    customer.Address = address;

    await customerRepository.create(customer);

    customer.changeName('new updated customer A');
    await customerRepository.update(customer);
    const customerModelupdated = await CustomerModel.findOne({
      where: { id: '1' }
    });

    expect(customerModelupdated.toJSON()).toStrictEqual({
      id: '1',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zipcode,
      city: address.city
    });
  }),
    it('should find customer', async () => {
      const customerRepository = new CustomerRepository();
      const customer = new Customer('123', 'Customer 1');
      const address = new Address('Aqa', 444, 'Rua A', '111');
      customer.Address = address;
      await customerRepository.create(customer);

      const customerResult = await customerRepository.findById(customer.id);
      expect(customer).toStrictEqual(customerResult);
    });
  it('should find all customers', async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer('123', 'Customer 1');
    const address1 = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer1.Address = address1;
    customer1.addRewardPoints(10);
    customer1.activate();

    const customer2 = new Customer('456', 'Customer 2');
    const address2 = new Address('Street 2', 2, 'Zipcode 2', 'City 2');
    customer2.Address = address2;
    customer2.addRewardPoints(20);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
  });
  it('should fire an event when customer is created', async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address('Aqa', 123, 'rua a', 'Sao Paulo');
    const customer = new Customer('1', 'customer A');
    customer.Address = address;

    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();
    eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2);
    const spyHandler1 = jest.spyOn(eventHandler1, 'handler');
    const spyHandler2 = jest.spyOn(eventHandler2, 'handler');

    await customerRepository.create(customer);
    const customerModel = await CustomerModel.findOne({
      where: { id: '1' }
    });

    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zipcode,
      city: address.city
    });

    expect(
      eventDispatcher.getEventHandlers()['CustomerCreatedEvent']
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers()['CustomerCreatedEvent']
    ).toBeDefined();

    const customerCreatedEvent = new CustomerCreatedEvent({
      customerId: customer.id,
      customerName: customer.name,
      email: 'email@teste.com',
      status: 'created'
    });
    eventDispatcher.notify(customerCreatedEvent);

    expect(spyHandler1).toHaveBeenCalled();
    expect(spyHandler2).toHaveBeenCalled();
  });
  it('should fire an event when customer address is changed', async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address('Aqa', 123, 'rua a', 'Sao Paulo');
    const customer = new Customer('1', 'customer Alex');
    customer.Address = address;

    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new EnviaConsoleLogHandler();
    eventDispatcher.register('CustomerAddressUpdateEvent', eventHandler1);
    const spyHandler1 = jest.spyOn(eventHandler1, 'handler');

    await customerRepository.create(customer);
    const customerModel = await CustomerModel.findOne({
      where: { id: '1' }
    });

    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zipcode,
      city: address.city
    });

    const changedAddress = new Address(
      'Resende',
      123,
      'rua abc',
      'Rio Janeiro'
    );
    customer.changeAddress(changedAddress);
    await customerRepository.update(customer);
    const changedCustomerModel = await CustomerModel.findOne({
      where: { id: '1' }
    });

    expect(changedCustomerModel.toJSON()).toStrictEqual({
      active: customer.isActive(),
      city: customer.Address.city,
      id: '1',
      name: customer.name,
      number: customer.Address.number,
      rewardPoints: 0,
      street: customer.Address.street,
      zipcode: customer.Address.zipcode
    });

    expect(
      eventDispatcher.getEventHandlers()['CustomerAddressUpdateEvent']
    ).toBeDefined();

    const customerAddressUpdateEvent = new CustomerAddressUpdateEvent({
      customerId: customer.id,
      customerName: customer.name,
      address: customer.Address,
      email: 'email@teste.com',
      status: 'updated'
    });
    eventDispatcher.notify(customerAddressUpdateEvent);

    expect(spyHandler1).toHaveBeenCalled();
  });
});
