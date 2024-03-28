import Address from '../value-object/address';

export default class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _activate: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  isActive(): boolean {
    return this._activate;
  }

  activate() {
    if (this._address == undefined)
      throw new Error('Customer address is mandatory');
    this._activate = true;
  }
  deactivate() {
    this._activate = false;
  }

  validate() {
    if (this._id.length === 0) throw new Error('ID cannot be empty');
    if (this._name.length === 0) throw new Error('Name cannot be empty');
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get Address(): Address {
    return this._address;
  }

  set Address(value: Address) {
    this._address = value;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  addRewardPoints(points: number): void {
    this._rewardPoints += points;
  }
}
