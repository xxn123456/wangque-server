const BlogModel = require('../modules/blog.js')




class BlogController {


    // 创建文章
    static async create(ctx) {


        let req = ctx.request.body;
        try {

            const data = await BlogModel.create(req);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '创建文章成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '创建文章失败',
                data: err
            }

        }


    }

    // 修改文章

    static async update(ctx) {
        let req = ctx.request.body;
        try {

            let ret = await BlogModel.update(req);

            let blogDetail = await BlogModel.detail(req.id);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '修改文章成功',
                data: blogDetail
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '修改文章失败',
                data: err
            }

        }


    }

    static async updateSee(ctx) {
        let req = ctx.request.body;
        try {

            let ret = await BlogModel.updateSee(req);
          
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '修改文章阅读量',
                data: ret
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '修改文章阅读量',
                data: err
            }

        }


    }

    // 删除文章

    static async del(ctx) {
        let req = ctx.request.body;
        try {

            const data = await BlogModel.del(req.id);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '删除文章成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '删除文章失败',
                data: err
            }

        }


    }

    // 批量删除

    static async batchDel(ctx) {
        //接收客服端
        let req = ctx.request.body;
        if (req.batchList) {
            try {
                //创建文章模型
                const data = await BlogModel.bacthDel(req.batchList);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    articleType: data,
                    des: '批量删除文章类别成功',
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '批量删除文章类别失败',
                    des: err
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '类别id不能为空'
            }
        }
    }

    // 分页

    static async findAll(ctx) {
        let req = ctx.request.body;


        let data = await BlogModel.findAll(req);
            
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: '查找文章成功',
            data
        }

        // try {
        //     let data = await BlogModel.findAll(req);
            
        //     ctx.response.status = 200;
        //     ctx.body = {
        //         code: 200,
        //         msg: '查找文章成功',
        //         data
        //     }
        // } catch (err) {
        //     ctx.response.status = 416;
        //     ctx.body = {
        //         code: 416,
        //         msg: '查找文章失败',
        //         data: err
        //     }

        // }


    }

    // 查找文章详情

    static async findOne(ctx) {
        let req = ctx.request.body;
        try {
            let data = await BlogModel.detail(req.id);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '查找文章详情成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '查找文章详情失败',
                data: err
            }

        }


    }

    // 模糊搜索

    static async search(ctx) {
        let req = ctx.request.body;


        try {
            let data = await BlogModel.search(req);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '搜索文章详情成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '搜索文章详情失败',
                data: err
            }

        }


    }

}
module.exports = BlogController