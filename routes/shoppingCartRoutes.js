const Router = require('koa-router')
const ShoppingCart = require('../models/ShoppingCart')
const NotFoundError = require('../exceptions/NotFoundError')
const logger = require('../utils/log4').getLogger("error")
const { getShoppingCarts,
    getShoppingCartById,
    saveShoppingCart,
    deleteShoppingCartById,
    deleteShoppingCartItem,
    updateShoppingCart} = require('../services/shoppingCartServices')

const router = new Router({
    prefix: '/api/carrito'
})

router.get('/:id/products', async ctx => {
    try {
        const { id } = ctx.params
        const shoppingCartID = id

        const cart = await getShoppingCartById(shoppingCartID)

        ctx.body = cart.products

    }catch(error){
        logger.error(error)
        ctx.response.status = 500
        ctx.body = {
            errors: [error]
        }
      }
})

router.post('/', async ctx => {
    try {
        const shoppingCart = new ShoppingCart()

        const shoppingCartResponse = await saveShoppingCart(shoppingCart)

        ctx.body = shoppingCartResponse
    } catch (error) {
        logger.error(error)
        ctx.response.status = 500
        ctx.body = {
            errors: [error]
        }    }
})

router.post('/:id/products', async ctx => {
    try {
        const product = ctx.request.body
        const shoppingCartID = ctx.params.id
    
        const shoppingCartResponse = await updateShoppingCart(shoppingCartID,product)
    
        ctx.body = shoppingCartResponse
    } catch (error) {
        logger.error(error)
        ctx.response.status = 500
        ctx.body = {
            errors: [error]
        }    }
})

router.delete('/:id', async ctx => {
    try {
        const { id } = ctx.params

        await deleteShoppingCartById(id);

        ctx.body = { message: 'carrito se elimino' }
        
    } catch (error) {
        logger.error(error)
        if (error instanceof NotFoundError) {
            ctx.response.status = 404
            ctx.body = {
                error
            }
        }else{
            ctx.response.status = 500
            ctx.body = {
                errors: [error]
            }
        }
    }
})

router.delete('/:id/products/:idProducto', async ctx => {
    try {
        const { id, idProducto } = ctx.params

        const shoppingCartResponse = await deleteShoppingCartItem(id,idProducto)

        ctx.body = shoppingCartResponse
        
    } catch (error) {
        logger.error(error)
        if (error instanceof NotFoundError) {
            ctx.response.status = 404
            ctx.body = {
                error
            }
        }else{
            ctx.response.status = 500
            ctx.body = {
                errors: [error]
            }
        }
    }
})

module.exports=router;