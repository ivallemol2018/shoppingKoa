const ContenedorMongoose = require('../../contenedores/ContenedorMongoose')
const options = require('../../connection/mongoose')
const productsModel = require('./models/productModel')

class ProductDaoMongoose extends ContenedorMongoose {
  constructor() {
    super(options, productsModel)
  }

  async getAll() {
    const products = await super.getAll()

    return products.map((product) => {
      return { ...product.toJSON(), id: String(product._id.valueOf()) }
    })
  }

  async getById(id) {
    const products = await super.getById(id)
    return { ...products[0].toJSON(), id: String(products[0]._id.valueOf()) }
  }

}

module.exports = ProductDaoMongoose