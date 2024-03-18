import { Sequelize } from "sequelize-typescript"
import ProductModel from "../db/sequelize/model/product.model";
import { ProductRepository } from "./product.repository";
import { Product } from "../../domain/entity/product";

describe("Product repository test",()=> {
    let sequelize: Sequelize;
    beforeEach(async()=> {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory',
            logging: false,
            sync: { force: true},
        })
        sequelize.addModels([ProductModel])
        await sequelize.sync()
    }),
    afterEach(async () =>{
        await sequelize.close();
    }),
    it("should create a new Product",async()=> {
        const productRepository = new ProductRepository()
        const product = new Product("1","test",100);

        await productRepository.create(product);
        const productModel = await ProductModel.findOne({where: { id: '1'}})

        expect(productModel.toJSON()).toStrictEqual({id: "1", name: "test", price: 100})
    }),
    it("should update a Product",async()=> {
        const productRepository = new ProductRepository()
        const product = new Product("1","test",100);

        await productRepository.create(product);
        const productModel = await ProductModel.findOne({where: { id: '1'}})

        expect(productModel.toJSON()).toStrictEqual({id: "1", name: "test", price: 100})

        product.changeName("new test")
        product.changePrice(200)
        await productRepository.update(product)
        const productModel1 = await ProductModel.findOne({where: { id: '1'}})
        expect(productModel1.toJSON()).toStrictEqual({id: "1", name: "new test", price: 200})
    }),
    it("should find a Product",async()=> {
        const productRepository = new ProductRepository()
        const product = new Product("1","test",100);

        await productRepository.create(product);
        const productModel = await ProductModel.findOne({where: { id: '1'}})
        const foundProduct = await productRepository.findById(("1"))

        expect(productModel.toJSON()).toStrictEqual({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price
        })
    }),
    it("should find all Products",async()=> {
        const productRepository = new ProductRepository()
        const product = new Product("1","test",100);
        await productRepository.create(product);

        const product1= new Product("2","test 2",200);
        await productRepository.create(product1);

        const foundProducts = await ProductModel.findAll()
        const mappedFoundProducts = foundProducts.map(product => new Product(product.id, product.name, product.price));
        const products = [product, product1]

        expect(products).toEqual(mappedFoundProducts)
    })
})