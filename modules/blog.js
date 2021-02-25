const Blog = require('../schema/blog.js');


class BlogModel {

    // {
    //     artcleName: '忘却之都',
    //     artcleType: '前端',
    //     vistNum: '2020',
    //     CreaterName: "admin",
    //     artcleCreat:"2021-02-23"
    // }

    /**
     * 通过菜单id 查询菜单信息
     * @param id 文章ID
     * @returns {Promise<Model>}
     */
    static async create(data) {
        return await Blog.create({
            artcleName: data.artcleName,
            artcleTypeId: data.artcleTypeId,
            vistNum: data.vistNum,
            createrId: data.createrId,
            content: data.content
        });

    }

    // 更新操作
    static async update(data) {
        return await Blog.updateOne({
            _id: data.id,
            artcleName: data.artcleName,
            artcleTypeId: data.artcleTypeId,
            vistNum: data.vistNum,
            createrId: data.createrId,
            content: data.content
        });

    }

    // 删除操作

    static async del(data) {
        return await Blog.deleteOne({
            _id: data.id
        })
    }

    // 搜索分页
    static async findAll(data) {
        let currentPage = parseInt(data.currentPage);
        let pageSize = parseInt(data.pageSize);
        console.log("其拿到", data.artcleName, data.startTime);
        if (data.artcleName) {

            return await Blog.find({
                $or: [ //多条件，数组
                    {
                        artcleName: data.artcleName
                    },
                    {
                        createdAt: {
                            "$gt": new Date(data.startTime),
                            "$lt": new Date(data.endTime)



                        }
                    }
                ]
            }).skip((currentPage - 1) * pageSize).limit(pageSize);

        } else {
            return await Blog.find().skip((currentPage - 1) * pageSize).limit(pageSize);

        };


    }




}

module.exports = BlogModel;