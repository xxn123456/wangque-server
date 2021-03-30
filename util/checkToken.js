



let tools = require('../public/tool');


module.exports= async function(ctx,next){

    try{
        let token = ctx.headers.authorization;

        let User = await tools.verToken(token);
    
        ctx.request.header.user=User;
    
        await next(ctx);
    

    }catch(err){

        ctx.response.status = 401;
        ctx.body = {
            code: -1,
            desc: '当前暂无权限'
        }

    }
   
}