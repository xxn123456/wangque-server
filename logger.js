let logconfig = {
    des: ""
}

const logger = async(ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start;
    // console.log(ctx.request.body);
    console.log(ctx.session.userInfo);
    console.log(logconfig.des);
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
}

module.exports = { logger, logconfig }