const Biu = require('../schema/biu.js');


class BiuModel {

    /**
     * 通过菜单id 查询菜单信息
     * @param id 文章ID
     * @returns {Promise<Model>}
     */
    static async create(data) {

        return await Biu.create({
            // 邮箱
            color: data.color,
            // 验证码
            biuContent: data.biuContent
        });

    }


    static async del(data) {

        return await Biu.deleteOne({
            _id: data.id
        })

    }
    static async queryTotal(data) {


        let criteria = [];
        if (data.biuContent) {
            criteria.push({
                biuContent: data.biuContent
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


        if (criteria.length != 0) {
            return await Biu.find({
                $and: criteria
            }).count()
        } else {
            return await Biu.find().count()
        }

    }


    static async findAll(data) {
        let currentPage = parseInt(data.currentPage);
        let pageSize = parseInt(data.pageSize);

        let criteria = [];
        if (data.biuContent) {
            criteria.push({
                biuContent: data.biuContent
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

        if (criteria.length != 0) {
            return await Biu.find({
                $and: criteria
            }).skip((currentPage - 1) * pageSize).limit(pageSize)
        } else {
            return await Biu.find().skip((currentPage - 1) * pageSize).limit(pageSize)
        }


    }






}

module.exports = BiuModel;