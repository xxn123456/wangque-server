//功能处理
const userModule = require("../modules/user");

const jwt = require('jsonwebtoken');

//解析token
const tools = require('../public/tool')

//统一设置token有效时间  为了方便观察，设为10s
const expireTime = '2h'
class userController {
    //注册用户
    static async create(ctx) {
        const req = ctx.request.body;
    
        if (req.username && req.password) {
            try {

                let query = await userModule.getUserInfo(req);

                if (query) {
                    ctx.response.status = 200;
                    ctx.body = {
                        code: -1,
                        desc: '用户已存在'
                    }
                } else {
        
                    console.log("进入下一步")
                    const param = {
                        password: req.password,
                        username: req.username,
                        avatar: req.avatar,
                        role:"vistor"
                    }
                    const data = await userModule.userRegist(param);
                    ctx.response.status = 200;
                    ctx.body = {
                        code: 0,
                        desc: '用户注册成功',
                        data
                    }
                }
             

            } catch (error) {
                ctx.response.status = 416;
                ctx.body = {
                    code: -1,
                    desc: '参数不齐全'
                }
            }
        }
    }
   
    // 登录用户
    static async login(ctx) {
        const req = ctx.request.body;
        if (!req.username || !req.password) {
            return ctx.body = {
                code: '-1',
                msg: '用户名或密码不能为空'
            }
        } else {
            const info = await userModule.getUserInfo(req.username);
            if (info) {
                if (info.password === req.password) {
                    ctx.session.userInfo = req.username;
                    const token = jwt.sign({
                        user: req.username,
                        passWord: req.password
                    }, '123456', {
                        expiresIn: expireTime
                    });
                    return ctx.body = {
                        code: '200',
                        token: token,
                        desc: '登陆成功'
                    }
                } else {
                    return ctx.body = {
                        code: '-1',
                        desc: '用户密码错误'
                    }
                }
            } else {
                return ctx.body = {
                    code: '-1',
                    desc: '该用户尚未注册'
                }
            }
        };
    }
    // 修改用户密码
    static async updatePassword(ctx) {
        const req = ctx.request.body;
        if (req.userId && req.password) {
            try {
                const param = {
                    password: req.password,

                    userId: req.userId
                }
                const data = await userModule.updatePassword(param);

                ctx.response.status = 200;
                if (data == 0) {
                    return ctx.body = {
                        code: 0,
                        desc: '用户修改密码成功',
                    }
                }


            } catch (error) {
                ctx.response.status = 416;
                ctx.body = {
                    code: -1,
                    desc: '参数异常'
                }
            }
        }
    }


 
    // 获取用户信息

    static async getUserInfo(ctx) {
        const token = ctx.headers.authorization;
      
        if (token) {
            try {
               
                const result = await tools.verToken(token);

                let data = await userModule.getUserInfo(result.user);
               
                const info = {
                    userId: data.userId,
                    username: data.username,
                    avatar:data.avatar
                   
                };

                ctx.session.userInfo=info;
                ctx.status = 200;

                return ctx.body = {
                    code: '200',
                    userInfo: info,
                    desc: '获取用户信息成功'
                }
            } catch (error) {
            
                ctx.status = 401;

                return ctx.body = {
                    code: '-1',
                    desc: 'token失效，请重新拉去'
                }
            }
        } else {
            ctx.status = 401;

            return ctx.body = {
                code: '-1',
                desc: 'token,不存在请重新输入'
            }
        }
    }

   

    // 删除用户
    static async delUser(ctx) {
        const req = ctx.request.body;
        const token = ctx.headers.authorization;
        if (token) {
            try {

                console.log(req.userId);

                let data = await userModule.delUser(req.userId);
                console.log("删除情况")
                console.log(data)


                return ctx.body = {
                    code: '200',

                    desc: '删除用户成功'
                }
            } catch (error) {
                ctx.status = 401;
                return ctx.body = {
                    code: '-1',
                    desc: '服务器异常删除失败'
                }
            }
        } else {
            ctx.status = 401;
            return ctx.body = {
                code: '-1',
                desc: '登陆过期，请重新登陆'
            }
        }
    }

    static async findUsers(ctx) {

        const token = ctx.headers.authorization;
        if (token) {
            try {
                let data = await userModule.findUsers();

                console.log(data)


                return ctx.body = {
                    code: '200',
                    users: data,
                    desc: '删除用户成功'
                }
            } catch (error) {
                ctx.status = 401;
                return ctx.body = {
                    code: '-1',
                    desc: '服务器异常删除失败'
                }
            }
        } else {
            ctx.status = 401;
            return ctx.body = {
                code: '-1',
                desc: '登陆过期，请重新登陆'
            }
        }
    }
    static async findAll(ctx) {
        let req = ctx.request.body;
        
      

        try {
            let data = await userModule.findAll(req);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '查找所有用户成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '查找所有用户失败',
                data: err
            }

        }


    }




}

module.exports = userController;