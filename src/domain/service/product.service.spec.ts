import { Product } from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit tests",()=> {
    it("should change all product prices",() => {
        const prod1 = new Product("3", "Coffee Mug", 100);
        const prod2 = new Product("5", "Keyboard", 200);
        const products = [prod1, prod2]

        ProductService.increasePrice(products,10)

        expect(prod1.price).toBe(110);
        expect(prod2.price).toBe(220)
    })
})