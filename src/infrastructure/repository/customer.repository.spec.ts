import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepository from "./customer.repository";

describe("Customer repository unit tests", ()=> {
    let sequelize: Sequelize;
    beforeEach(async()=> {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory',
            logging: false,
            sync: { force: true},
        })
        sequelize.addModels([CustomerModel])
        await sequelize.sync()
    }),
    afterEach(async () =>{
        await sequelize.close();
    }),
    it("should create a new customer",async() => {
        const customerRepository = new CustomerRepository()
        const address = new Address("Aqa",123,"rua a", "Sao Paulo")
        const customer = new Customer("1","customer A")
        customer.Address = address

        await customerRepository.create(customer);
        const customerModel = await CustomerModel.findOne({ where: { id: "1"}})

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zipcode,
            city: address.city,
        })
    })
    it("should update a new customer",async() => {
        const customerRepository = new CustomerRepository()
        const address = new Address("Aqa",123,"rua a", "Sao Paulo")
        const customer = new Customer("1","customer A")
        customer.Address = address

        await customerRepository.create(customer);

        customer.changeName("new updated customer A")
        await customerRepository.update(customer)
        const customerModelupdated = await CustomerModel.findOne({ where: { id: "1"}})

        expect(customerModelupdated.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zipcode,
            city: address.city,
        })
    }),
    it("should find customer",async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Aqa", 444,"Rua A","111");
        customer.Address = address;
        await customerRepository.create(customer);
    
        const customerResult = await customerRepository.findById(customer.id);
        expect(customer).toStrictEqual(customerResult);
    }),
    
    it("should find all customers", async () => {
      const customerRepository = new CustomerRepository();
      const customer1 = new Customer("123", "Customer 1");
      const address1 = new Address("Street 1", 1, "Zipcode 1", "City 1");
      customer1.Address = address1;
      customer1.addRewardPoints(10);
      customer1.activate();
  
      const customer2 = new Customer("456", "Customer 2");
      const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
      customer2.Address = address2;
      customer2.addRewardPoints(20);
  
      await customerRepository.create(customer1);
      await customerRepository.create(customer2);
  
      const customers = await customerRepository.findAll();
  
      expect(customers).toHaveLength(2);
      expect(customers).toContainEqual(customer1);
      expect(customers).toContainEqual(customer2);
    });
})