const koa = require('koa')
const session = require('koa-session2')
const passport = require('./middlewares/passport-local') 

const koaBody = require('koa-body')
const MongoStore = require('koa-session2-mongostore')
const logger = require('./utils/log4').getLogger()
const loggerNotFound = require('./utils/log4').getLogger("warn")
const apiProduct = require('./routes/productRoutes')
const apiShoppingCart = require('./routes/shoppingCartRoutes')
const apiOrder = require('./routes/orderRoutes')
const apiAuht = require('./routes/authRoutes')


const keys = require('./config/keys');

const app = new koa()

app.use(koaBody())

app.use(session({
    store: new MongoStore({
        url: keys.hostDbEcommerce,
        ttl: 60
    }),
    secret: 'dumbledure',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(async (ctx, next) => {
    logger.info('Path :' + ctx.request.path + ' Method:' + ctx.method)
    await next();
})


app.use(apiAuht.routes())
app.use(apiProduct.routes())
app.use(apiShoppingCart.routes())
app.use(apiOrder.routes())

module.exports = app