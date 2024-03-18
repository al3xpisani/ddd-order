import OrderItem from "./order-item";

// O conceito de agregado serve para organizar algumas complexidades do software:

// Limites transacionais - Imagine o exemplo de Cliente, Pedido e Item do Pedido. 
// O pedido seria um agregado que contém o item do pedido, 
// porque no momento de realizar uma transação temos que garantir a consistência com os dois, 
// ou seja, os dois precisam estar salvos, 

// mas o Cliente não precisa ser modificar quando um pedido é construído, 
// somente o próprio Pedido, 
// logo ele possui uma relação fraca que só é preciso do ID do cliente.

// Limite arquitetural - Determinando que Cliente é outro Agregado, 
// estabelecemos que ele deve ser independente 
// e terá seu próprio domain service - seu próprio repositório. 
// Queremos uma barreira separando os agregados para manter sua independência, 
// mexeu-se no Cliente, não afeta o pedido.


export default class Order {
    private _id: string;
    private _customerId: string;  //acima o porque que o customerId pode ser apenas uma string (weak)
    private _items: OrderItem[];  //já um Item não consegue existir sem uma ordem. relação de dependencia.
    private _total: number;

    constructor(id: string, customerId: string, items: OrderItem[]){
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total()
        this.validate();
    }

    get id(): string {
        return this._id
    }

    get customerId(): string {
        return this._customerId
    }

    get items(): OrderItem[] {
        return this._items
    }

    validate(): boolean {
        if(this._id.length === 0){
            throw new Error("Id is required")
        }
        if(this._customerId.length === 0){
            throw new Error("CustomerId is required")
        }
        if(this._items.length === 0){
            throw new Error("Item qtd must be greater than zero")
        }
        return true;
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
      }
}