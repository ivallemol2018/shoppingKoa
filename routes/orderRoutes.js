const Router = require('koa-router')
const sendEmail = require('../utils/email')
const sendWhatapp = require('../utils/twilio')

const router = new Router({
    prefix: '/api/order'
})

router.post('/', async ctx => {
    try {
        const { buyer,products} = ctx.request.body

        sendEmail(request.body,'Resumen Orden','email.order.template.ejs',buyer.username)
  
        const message = `Hola ${buyer.name} .Gracias por comprar con nosotros. Te enviaremos una confirmación cuando tu artículo se envíe.`
  
        sendWhatapp(message,buyer.phone)

        ctx.body = {
            message:'successful'
        }
    } catch (error) {
        logger.error(error)
        ctx.response.status = 500
        ctx.body = {
            errors: [error]
        }    }
})

module.exports=router;