
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;

const {
    Op
} = require("sequelize");

// 引入数据表模型
const LogSure = Sequelize.import('../schema/log.js');

class LogModel {

    static async add(content) {

      
    
        return await LogSure.create(content);
    }


    static async findAll(data) {
        let offset = data.pageSize * (data.currentPage - 1);
        let limit = parseInt(data.pageSize);
        let criteria = [];

        if (data.nickname) {
            criteria.push({
                nickname: data.nickname
            })
        }
        
        if (data.startTime || data.endTime) {
            criteria.push({
                createdAt: {
                    $gt: new Date(data.startTime),
                    $lt: new Date(data.endTime)
                }
            })
        }

        return await LogSure.findAndCountAll({
            where: {
                [Op.and]:criteria
            },
            offset,
            limit
         

        });

       

    }




}

module.exports = LogModel;