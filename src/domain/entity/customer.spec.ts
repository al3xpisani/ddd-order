import Address from './address'
import Customer from './customer'

describe('Customer unit tests', function () {
  it('should throw error when ID is empty', function () {
    expect(() => {
      let customer = new Customer('', 'Jhon')
    }).toThrow('ID cannot be empty')
  })
  it('should throw error when Name is empty', function () {
    expect(() => {
      let customer = new Customer('1', '')
    }).toThrow('Name cannot be empty')
  })
  it('should change name', function () {
    const customer = new Customer('1', 'Alex')
    customer.changeName('Jane')
    expect(customer.name).toBe('Jane')
  })
  it('should activate customer', function () {
    const customer = new Customer('1', 'Customer1')
    const address = new Address('Aqa', 123, 'Rua 1', '123')
    customer.changeAddress(address)
    customer.activate()

    expect(customer.isActive()).toBe(true)
  })
  it('should deactivate customer', function () {
    const customer = new Customer('1', 'Customer1')
    customer.deactivate()

    expect(customer.isActive()).toBe(false)
  })
  it('should error when address is undefined', function () {
    expect(() => {
      const customer = new Customer('1', 'Customer1')
      customer.activate()
    }).toThrow('Customer address is mandatory')
  })
})
