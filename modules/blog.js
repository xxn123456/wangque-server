// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;

const {
    Op
} = require("sequelize");

// 引入数据表模型
const Blog = Sequelize.import('../schema/blog.js');

const BlogType = Sequelize.import('../schema/articleType.js');

const User = Sequelize.import('../schema/user.js');


// 进行表关联查询

Blog.belongsTo(BlogType, {
    foreignKey: 'articleTypeId'
  });

Blog.belongsTo(User, {
    foreignKey: 'userId'
  });






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
        return await Blog.findOne({
            where: {
                id
            }
        });
    }

    static async search(data) {
        return await Blog.findAll({
            where: {
                title:{
                    [Op.like]:'%' +data.title + '%'
                }
            }
        });
    }

     

    // 对文章类别进行搜索分页显示
    static async findAll(data) {

        let offset = data.pageSize * (data.currentPage - 1);
        let limit = parseInt(data.pageSize);

        let criteria = [];

        if (data.categoryName) {
            criteria.push({
                categoryName: data.categoryName
            })

        }

        
        if (data.categoryId) {
            criteria.push({
                articleTypeId: data.categoryId
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
                [Op.and]:criteria
            
            },
            offset,
            limit,
            include: [{
                    model: BlogType
                },
                {
                    model: User
                }
            ]

        });
    }


}

module.exports = BlogModel;