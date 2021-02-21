const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const Log = Sequelize.import('../schema/log');
Log.sync({ force: true }); //自动创建表

class LogModel {


    /**
     * 通过菜单id 查询菜单信息
     * @param id 文章ID
     * @returns {Promise<Model>}
     */
    // static async creatMail(data) {
    //     return await Mail.create({
    //         // 邮箱
    //         email: data.mail,
    //         // 验证码
    //         code: data.code
    //     });
    // }
    static async add(content) {
        let log = new LogModel(content)
        await log.save()
    }



}

module.exports = LogModel;