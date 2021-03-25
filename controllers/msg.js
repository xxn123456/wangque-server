const MsgModel = require("../modules/msg");

class MsgController {
    /**
     * 创建文章
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        //接收客服端
        let req = ctx.request.body;
        if (req.qq) {
            try {
                //创建文章模型
                const ret = await MsgModel.create(req);
                //使用刚刚创建的文章ID查询文章详情，且返回文章详情信息
                const data = await MsgModel.detail(ret.id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    data,
                    des: '评价成功',
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '评价失败',
                    des: err
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '评价人qq不能为空'
            }
        }
    }
    static async updata(ctx) {
        //接收客服端
        let req = ctx.request.body;
        if (req.qq) {
            try {
                //创建文章模型
                await MsgModel.upDate(req);
                const data = await MsgModel.detail(req.id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    data,
                    des: '更新评价成功',
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '更新评价失败',
                    des: err
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '评价人不能为空'
            }
        }
    }

    // 删除文章类别

    static async del(ctx) {
        //接收客服端
        let req = ctx.request.body;
        if (req.id) {
            try {
                //创建文章模型
                const data=await MsgModel.del(req.id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    data,
                    des: '删除评价成功',
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '删除评价失败',
                    des: err
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '评价id'
            }
        }
    }

    // 批量删除操作

    static async batchDel(ctx) {
        //接收客服端
        let req = ctx.request.body;
        if (req.batchList) {
            try {
                //创建文章模型
                const data=await MsgModel.bacthDel(req.batchList);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    data,
                    des: '批量删除评价成功',
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '批量删除评价失败',
                    des: err
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '评价id不能为空'
            }
        }
    }

    // 查询所有分页

    static async findAll(ctx) {
        //接收客服端
        let req = ctx.request.body;
        if (req.currentPage && req.pageSize) {
            try {
                //创建文章模型
                const data = await MsgModel.finAll(req);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    data,
                    des: '查找所有评价成功',
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查找所有评价异常',
                    des: err
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '参数不齐全'
            }
        }
    }
}

module.exports = MsgController;