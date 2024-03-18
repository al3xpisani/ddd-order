import Order from "./order"
import OrderItem from "./order-item";

describe("Order unit tests", function() {
    it("should throw an error when id is empty",()=> {
        expect(()=>{
            let order = new Order("","10",[]);
        }).toThrow("Id is required")
    })
    
    it("should throw an error when customerID is empty",()=> {
        expect(()=>{
            let order = new Order("123","",[]);
        }).toThrow("CustomerId is required")
    })
    
    it("should throw an error when Item is empty",()=> {
        expect(()=>{
            let order = new Order("123","123",[]);
        }).toThrow("Item qtd must be greater than zero")
    })
    
    it("should calculate Total",()=> {
            let item = new OrderItem("1","xptoItem1", 100,"1",1)
            let item2 = new OrderItem("2","xptoItem2", 44,"1",1)
            let order = new Order("123","123",[item,item2]);
            const total = order.total();

            expect(total).toBe(144)
    })
    
    it("should throw error when price is zero",()=> {
        expect(()=> {
            let item = new OrderItem("1","xptoItem1", 0,"1",1)
            let order = new Order("123","123",[item]);
        }).toThrow("Price must be greater than zero");

    })
    
    it("should throw error when item quantity is zero",()=> {
        expect(()=> {
            let item = new OrderItem("1","xptoItem1", 1,"1",0)
            let order = new Order("123","123",[item]);
        }).toThrow("Item Quantity must be greater than zero");

    })


})