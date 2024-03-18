import Customer from '../entity/customer'
import Order from '../entity/order'
import OrderItem from '../entity/order-item'
import { OrderService } from './order.service'

describe('Order service unit test', () => {
  it('should create a new order', () => {
    const customer1 = new Customer('1', 'customer1')
    const orderItem1 = new OrderItem('1', 'item1', 100, '1', 10)

    const order = OrderService.PlaceOrder(customer1, [orderItem1])
    expect(customer1.rewardPoints).toBe(500)
    expect(order.total()).toBe(1000)
  })
  it('should calculate the total of all the orders', () => {
    const orderItem1 = new OrderItem('1', 'Item1', 100, '1', 10)
    const orderItem2 = new OrderItem('2', 'Item2', 200, '1', 10)
    const order1 = new Order('1,', '1', [orderItem1])
    const order2 = new Order('2,', '1', [orderItem2])

    const total = OrderService.Summarize([order1, order2])
    expect(total).toBe(3000)
  })
})
