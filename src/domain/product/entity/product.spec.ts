import { Product } from './product'

describe('Product unit tests', function () {
  it('should throw an error when Product id is empty', () => {
    expect(() => {
      let product = new Product('', 'Product 1', 100)
    }).toThrow('Product id is required')
  })

  it('should throw an error when Product name is empty', () => {
    expect(() => {
      let product = new Product('1', '', 100)
    }).toThrow('Product name is required')
  })

  it('should throw an error when Product price is zero', () => {
    expect(() => {
      let product = new Product('1', 'Product 1', 0)
    }).toThrow('Product price is required')
  })

  it('should throw an error when Product name has changed', () => {
    const product = new Product('1', 'Product1', 100)
    product.changeName('NewProduct')
    expect(product.name).toBe('NewProduct')
  })

  it('should throw an error when Product price has changed', () => {
    const product = new Product('1', 'Product1', 100)
    product.changePrice(200)
    expect(product.price).toBe(200)
  })
})
