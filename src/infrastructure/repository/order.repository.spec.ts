import { Sequelize } from 'sequelize-typescript'
import ProductModel from '../db/sequelize/model/product.model'
import OrderModel from '../db/sequelize/model/order.model'
import Order from '../../domain/entity/order'
import OrderItem from '../../domain/entity/order-item'
import { ProductRepository } from './product.repository'
import { Product } from '../../domain/entity/product'
import Address from '../../domain/entity/address'
import Customer from '../../domain/entity/customer'
import CustomerModel from '../db/sequelize/model/customer.model'
import OrderItemModel from '../db/sequelize/model/order-item.model'
import CustomerRepository from './customer.repository'
import OrderRepository from './order.repository'

describe('Order repository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([
      CustomerModel,
      OrderItemModel,
      OrderModel,
      ProductModel
    ])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a new order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('123', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    )

    const order = new Order('123', '123', [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items']
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '123',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: '123',
          product_id: '123'
        }
      ]
    })
  })

  it('should update a existing order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('123', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    )
    const order = new Order('123', '123', [orderItem])
    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const updatedOrderItem = new OrderItem(
      '1',
      product.name,
      400,
      product.id,
      4
    )
    updatedOrderItem.name = 'Changed Product name'
    const updatedOrder = new Order('123', '123', [updatedOrderItem])
    await orderRepository.update(updatedOrder)

    const updatedOrderModel = await OrderModel.findByPk(order.id, {
      include: ['items']
    })

    expect(updatedOrderModel.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '123',
      total: updatedOrderItem.price,
      items: [
        {
          id: '1',
          name: updatedOrderItem.name,
          price: updatedOrderItem.price,
          quantity: updatedOrderItem.quantity,
          order_id: '123',
          product_id: '123'
        }
      ]
    })
  })
})
