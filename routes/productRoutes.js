const Router = require('koa-router')
const Product = require('../models/Product')
const NotFoundError = require('../exceptions/NotFoundError')
const logger = require('../utils/log4').getLogger("error")
const { getProducts, getProductById, saveProduct, deleteProductById, updateProduct } = require('../services/productServices')

const router = new Router({
    prefix: '/api/productos'
})

router.get('/', async ctx => {
    try {
        const products = await getProducts()

        ctx.body = products
    } catch (error) {
        logger.error(error)
    }

})

router.get('/:id', async ctx => {
    try {

        const { id } = ctx.params
        const product = await getProductById(id)

        ctx.body = product
    } catch (error) {
        logger.error(error)
    }

})

router.post('/', async ctx => {
    try {

        const { id } = ctx.params

        const { title, price, thumbnail } = ctx.request.body

        const product = new Product(title, thumbnail)

        product.id = id
        product.price = price

        await updateProduct(product)

        ctx.body = {
            success: true,
            message: 'Producto registrado',
            id: product.id
        }
    } catch (error) {
        logger.error(error)
    }
})

router.put('/:id', async ctx => {
    try {
        const { id } = ctx.params
        const { title, price, thumbnail } = ctx.request.body

        const product = new Product(title, thumbnail)

        product.id = id
        product.price = price

        await updateProduct(product)

        ctx.body = {
            success: true,
            message: 'Producto registrado',
            id: product.id
        }
    } catch (error) {
        logger.error(error)
        if (error instanceof NotFoundError) {
            ctx.response.status = 404
            ctx.body = {
                error
            }
        }
        ctx.response.status = 500
        ctx.body = {
            errors: [error]
        }
        return response.status(500).json({ errors: [error] })
    }
})

router.delete('/:id', async ctx => {
    try {
        const { id } = ctx.params
        const { title, price, thumbnail } = ctx.request.body

        await deleteProductById(id)

        const products = await getProducts()

        ctx.body = {
            success: true,
            message: 'Producto eliminado',
            products
        }
        
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

module.exports = router