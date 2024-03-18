export default class OrderItem {
  private _id: string
  private _productId: string
  private _name: string
  private _price: number
  private _quantity: number = 0

  constructor(
    id: string,
    name: string,
    price: number,
    productId: string,
    quantity: number
  ) {
    this._id = id
    this._name = name
    this._price = price
    this._productId = productId
    this._quantity = quantity
    this.validate()
  }

  validate() {
    if (this._price <= 0) throw new Error('Price must be greater than zero')
    if (this._quantity <= 0)
      throw new Error('Item Quantity must be greater than zero')
  }

  get id(): string {
    return this._id
  }

  set name(value: string) {
    this._name = value
  }

  set quantity(value: number) {
    this._quantity = value
  }

  set price(value: number) {
    this._price = value
  }

  get name(): string {
    return this._name
  }

  get productId(): string {
    return this._productId
  }

  get quantity(): number {
    return this._quantity
  }

  get price(): number {
    return this._price * this._quantity
  }

  orderItemTotal(): number {
    return this._price * this._quantity
  }
}
