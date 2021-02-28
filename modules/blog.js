// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;
const {
    Op
} = require("sequelize");

// 引入数据表模型
const Blog = Sequelize.import('../schema/blog.js');
Blog.sync({
    force: false
}); //自动创建表

class BlogModel {
    /**
     * 创建文章模型
     * @param data
     * @returns {Promise<*>}
     */
    // 创建文章类别
    static async create(data) {
        return await Blog.create({
            title: data.title, //标题
            articleTypeId: data.articleTypeId,
            visitNum: data.visitNum,
            userId: data.userId,
            content: data.content
        });
    }
    // 更新文章类别
    static async update(data) {
       
        return await Blog.update({
            title: data.title, //标题
            articleTypeId: data.articleTypeId,
            visitNum: data.visitNum,
            userId: data.userId,
            content: data.content
        }, {
            where: {
                id: data.id
            }
        });
    }
    // 对文章进行删除
    static async del(id) {
        console.log("进入删除逻辑")
         
        
        return await Blog.destroy({
            where: {
                id
            }
        });
    }

    // 对文章批量删除
    static async bacthDel(data) {
        return await Blog.destroy({
            where: {
                id: data
            }
        })
    }
    /**
     * 查询文章的详情
     * @param id 文章ID
     * @returns {Promise<Model>}
     */
    static async detail(id) {
        console.log("开始查找这条信息",id)
        return await Blog.findOne({
            where: {
                id
            }
        });
    }

    // 对文章类别进行搜索分页显示
    static async finAll(data) {
        console.log("开始查找")
        let offset = data.pageSize * (data.currentPage - 1);
        let limit = parseInt(data.pageSize);
        let criteria = [];

        if (data.title) {
            criteria.push({
                title: data.title
            })
        }
        if (data.startTime || data.endTime) {
            criteria.push({
                createdAt: {
                    [Op.between]: [new Date(data.startTime), new Date(data.endTime)]
                }
            })

        }

        return await Blog.findAndCountAll({

            where: {
                [Op.and]: criteria
            },
            //offet去掉前多少个数据
            offset,
            //limit每页数据数量
            limit: limit

        })




    }

}

module.exports = BlogModel;