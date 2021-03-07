const sha1 = require('sha1')


const config = {
    wechat: {
        appID: 'wx3f32158413714763', //填写你自己的appID
        appSecret: '04d6889e2d80b47e619e6c196ccfdd83', //填写你自己的appSecret
        token: 'aabbcc' //填写你自己的token
    }
}

class WxController {
    static async login(ctx) {
        const token = config.wechat.token
        const signature = ctx.request.query.signature
        const nonce = ctx.request.query.nonce
        const timestamp = ctx.request.query.timestamp
        const echostr = ctx.request.query.echostr
        let str = [token, timestamp, nonce].sort().join('')
        const sha = sha1(str)
        ctx.body = sha === signature ? echostr + '' : 'failed'
    }

}
module.exports = WxController