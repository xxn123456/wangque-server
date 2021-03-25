// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;
const {
    Op
} = require("sequelize");

// 引入数据表模型
const Msg = Sequelize.import('../schema/msg.js');
Msg.sync({
    force: false
}); //自动创建表

class MsgModel {
    /**
     * 创建文章模型
     * @param data
     * @returns {Promise<*>}
     */
    // 创建文章类别
    static async create(data) {
        return await Msg.create({
            content: data.content, //标题
            articleId: data.articleId,
            qq:data.qq,
            qqAvtor:data.qqAvtor
        });
    }

    // 更新文章类别
    static async upDate(data) {
        return await Msg.update({
            content: data.content,
            articleId: data.articleId,
            qq:data.qq,
            qqAvtor:data.qqAvtor
        }, {
            where: {
                id: data.id
            }
        });
    }
    // 对文章进行删除
    static async del(id) {
        return await Msg.destroy({
            where: {
                id
            }
        });
    }
    
    // 对文章批量删除
    static async bacthDel(data) {
                return await Msg.destroy({
                    where: {
                        id: data
                    }
                })
            }
    /**
     * 查询文章的详情
     * @param id 文章ID
     * @returns {Promise<Model>}
     */
    static async detail(id) {
        return await Msg.findOne({
            where: {
                id
            }
        });
    }
    // 对文章类别进行搜索分页显示
    static async finAll(data) {
        let offset = data.pageSize * (data.currentPage - 1);
        let limit = parseInt(data.pageSize);

        let criteria = [];

        if(data.qq){
            criteria.push({qq:data.qq})
        }
        if(data.startTime||data.endTime){
            criteria.push({           
                createdAt: {
                    [Op.between]: [new Date(data.startTime), new Date(data.endTime)]
                }
            })
           
        }

        return await Msg.findAndCountAll({
            where: {
                [Op.and]:criteria
            },
            //offet去掉前多少个数据
            offset,
            //limit每页数据数量
            limit: limit

        })
        

   

    }

}

module.exports = MsgModel;