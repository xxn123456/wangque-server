
const BiuModel = require('../modules/biu.js')

class BiuController {
    static async create(ctx) {
        let req = ctx.request.body;
        try {
            const music = await BiuModel.create(req);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
               des: '创建弹幕成功',
                data: music
            }
        } catch (err) {
            ctx.response.status = 200;
            ctx.body = {
                code: 401,
               des: '创建弹幕失败',
                data: err
            }

        }


    }

    static async del(ctx) {
        let req = ctx.request.body;
        if (req.id) {
            try {
               
                const music = await BiuModel.del(req);

            

                if (music) {
                    ctx.response.status = 200;
                    ctx.body = {
                        code: 200,
                        des:"删除音乐成功",
                       data: music
                    }
                }
            } catch (err) {
                ctx.response.status = 200;
                ctx.body = {
                    code: 401,
                    des: '删除音乐失败',
                    data: err
                }

            }

        } else {
            ctx.response.status = 200;
            ctx.body = {
                code: 401,
                des: '查缺少参数id',
                data: music
            }
        }
    }

    static async findAll(ctx) {
        let req = ctx.request.body;
        try {     
            let music = await BiuModel.findAll(req);
            let total= await  BiuModel.queryTotal(req);
            if (music) {
                ctx.response.status = 200;
                ctx.body = {
                code: 200,
                   data: music,
                   total
                }
            }
        } catch (err) {
            ctx.response.status = 200;
            ctx.body = {
                code: 401,
                des: '查找音乐列表失败',
                data: err
            }

        }


    }
}
module.exports = BiuController