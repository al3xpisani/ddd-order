export default class Address {
    _city: string;
    _address: string;
    _number: number;
    _street: string
    _zipcode: string;

    constructor(city: string, number: number,  street: string, zipcode?: string) {
        this._city = city;
        this._number = number;
        this._street = street;
        this._zipcode  = (zipcode === undefined ? '' : zipcode);
    }

    get city(): string {
        return this._city;
    }
    get  number(): number {
        return  this._number;
    }
    get street(): string {
        return this._street
    }
    get zipcode(): string {
        return this._zipcode
    }
    
    toString() {
        return `${this._street}, ${this._number}, ${this._zipcode} ${this._city}`;
      }
}