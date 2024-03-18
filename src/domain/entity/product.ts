export class Product {
  private _id: string
  private _name: string
  private _price: number

  constructor(id: string, name: string, price: number) {
    this._id = id
    this._name = name
    this._price = price
    this.validate()
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get price(): number {
    return this._price
  }

  changeName(name: string): string {
    this._name = name
    return name
  }

  changePrice(price: number): number {
    this._price = price
    return this._price
  }

  validate() {
    if (this._id.length === 0) {
      throw Error('Product id is required')
    }
    if (this._name.length === 0) {
      throw Error('Product name is required')
    }
    if (this._price <= 0) {
      throw Error('Product price is required')
    }
  }
}
