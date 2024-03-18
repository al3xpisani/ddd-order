import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer.repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
            street: entity.Address.street,
            number: entity.Address.number,
            zipcode: entity.Address.zipcode,
            city: entity.Address.city,
        })
    }
    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            id: entity.id,
            name: entity.name,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
            street: entity.Address.street,
            number: entity.Address.number,
            zipcode: entity.Address.zipcode,
            city: entity.Address.city,
        },{
            where: {
                id: entity.id
            }
        })
    }
    async findById(id: string): Promise<Customer> {
        let customerModel;
        try {
          customerModel = await CustomerModel.findOne({
            where: {
              id,
            },
            rejectOnEmpty: true,
          });
        } catch (error) {
          throw new Error("Customer not found");
        }
    
        const customer = new Customer(id, customerModel.name);
        const address = new Address(
            customerModel.city,
            customerModel.number,
            customerModel.street,
            customerModel.zipcode,
        );
        customer.changeAddress(address);
        return customer;
    }
    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();
    
        const customers = customerModels.map((customerModels) => {
          let customer = new Customer(customerModels.id, customerModels.name);
          customer.addRewardPoints(customerModels.rewardPoints);
          const address = new Address(
            customerModels.city,
            customerModels.number,
            customerModels.street,
            customerModels.zipcode,
          );
          customer.changeAddress(address);
          if (customerModels.active) {
            customer.activate();
          }
          return customer;
        });
    
        return customers;
    }
    
}