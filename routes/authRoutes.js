const Router = require('koa-router')
const passport = require('./../middlewares/passport-local') 

const router = new Router()

router.post( '/api/login', async (ctx)=>{

    return passport.authenticate('login', (err, user, info, status) => {
        
        if (user === false) {
          ctx.body = { success: false };
          ctx.throw(401);
        } else {
            const {username,name,phone} = user

            ctx.body = {
                message:'succesful',
                username : username,
                name : name,
                phone: phone
            }
          
        }
      })(ctx)
  })

  router.post('/api/logout',async (ctx)=>{
  
    ctx.body = {
        message:'succesful'
    }

  })

  module.exports = router