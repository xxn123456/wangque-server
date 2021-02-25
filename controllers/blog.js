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
                data: data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '创建文章失败',
                data: err
            }

        }


    }

    // 修改文章

    static async update(ctx) {
        let req = ctx.request.body;
        try {
             
            const data = await BlogModel.update(req);
        
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '修改文章成功',
                data: data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '修改文章失败',
                data: err
            }

        }


    }

    // 删除文章

    static async del(ctx) {
        let req = ctx.request.body;
        try {
             
            const data = await BlogModel.del(req);
        
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '删除文章成功',
                data: data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '删除文章失败',
                data: err
            }

        }


    }

    static async findAll(ctx) {
        let req = ctx.request.body;
        try {
            const data = await BlogModel.findAll(req);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '查找文章成功',
                data: data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '查找文章失败',
                data: err
            }

        }


    }

}
module.exports = BlogController