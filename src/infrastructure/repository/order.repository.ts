import Order from '../../domain/entity/order'
import OrderItem from '../../domain/entity/order-item'
import OrderRepositoryInterface from '../../domain/repository/order.repository.interface'
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
  //observar que nesse ORM, alterar os campos que quiser no modelo e salvar.
  //uma coisa é entidade e outra coisa é o model
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
  async findById(id: string): Promise<Order> {
    const orderModel = await OrderModel.findByPk(id, {
      include: [OrderItemModel]
    })
    const orderItems = orderModel.items.map(
      (item) =>
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        )
    )
    return new Order(orderModel.id, orderModel.customer_id, orderItems)
  }
  async findAll(): Promise<Order[]> {
    const orderModel = await OrderModel.findAll({
      include: [OrderItemModel]
    })
    const orders: Order[] = []
    orderModel.forEach((item) => {
      const orderItems = item.items.map(
        (subItem) =>
          new OrderItem(
            subItem.id,
            subItem.name,
            subItem.price,
            subItem.product_id,
            subItem.quantity
          )
      )
      const order = new Order(item.id, item.customer_id, orderItems)
      orders.push(order)
    })
    return orders
  }
}
