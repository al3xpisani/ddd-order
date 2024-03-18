import Order from '../../domain/entity/order'
import OrderRepositoryInterface from '../../domain/repository/order.repository.interface'
import ProductService from '../../domain/service/product.service'
import OrderItemModel from '../db/sequelize/model/order-item.model'
import OrderModel from '../db/sequelize/model/order.model'

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity
        }))
      },
      {
        include: [{ model: OrderItemModel }]
      }
    )
  }
  async update(entity: Order): Promise<void> {
    const { id, price, quantity, name } = entity.items[0]
    const orderItemModel = await OrderItemModel.findByPk(id)
    if (!orderItemModel) {
      throw new Error('Order Item not found')
    }
    orderItemModel.price = price
    orderItemModel.quantity = quantity
    orderItemModel.name = name
    await orderItemModel.save()

    const existingOrderModel = await OrderModel.findByPk(entity.id, {
      include: [OrderItemModel]
    })
    existingOrderModel.total = entity.total()
    await existingOrderModel.save()
  }
  findById(id: string): Promise<Order> {
    throw new Error('Method not implemented.')
  }
  findAll(): Promise<Order[]> {
    throw new Error('Method not implemented.')
  }
}
