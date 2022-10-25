const ContenedorMongoose = require('../../contenedores/ContenedorMongoose')
const options = require('../../connection/mongoose')
const shoppingCartModel = require('./models/shoppingCartModel')

class ShoppingCartDaoMongoose extends ContenedorMongoose {
  constructor() {
    super(options, shoppingCartModel)
  }

  async getAll() {
    const shoppingCart = await super.getAll()

    return shoppingCart.map((product) => {
      return { ...product.toJSON(), id: String(product._id.valueOf()) }
    })
  }

  async getById(id) {
    const shoppingCart = await super.getById(id)
    return { ...shoppingCart[0].toJSON(), id: String(shoppingCart[0]._id.valueOf()) }
  }

  async save(item) {
    const shoppingCart = await super.save(item)

    return { ...shoppingCart.toJSON(), id: String(shoppingCart._id.valueOf()) }

  }

  async update(shoppingCartID, product) {
    const shoppingCart = await this.getById(shoppingCartID)

    const productArray = shoppingCart.products;

    productArray.push({ ...product, id: product._id })

    shoppingCart.products = productArray

    await super.update(shoppingCart)

    const shoppingCartResponse = await this.getById(shoppingCartID)

    return shoppingCartResponse
  }

  async deleteItem(shoppingCartID,productoID){

    const shoppingCart = await this.getById(shoppingCartID)

    const products =  shoppingCart.products

    const idx = products.findIndex(p => p.id == productoID) 

    products.splice(idx , 1)

    shoppingCart.products = products

    await super.update(shoppingCart)

    const shoppingCartResponse = await this.getById(shoppingCartID)

    return shoppingCartResponse

  }    

}

module.exports = ShoppingCartDaoMongoose