const Router = require('koa-router');
const router = new Router();
const ArtileController = require('../controllers/article');
const userController = require('../controllers/user');
const MailController = require('../controllers/mail');
const MgController = require('../controllers/mg');
const multer = require('koa-multer');

// 文件下载
const send = require('koa-send');
// 开发导出表格

const nodeExcel = require('excel-export');
const fs = require("fs");
// 上传 图片
var storage = multer.diskStorage({
        //文件保存路径
        destination: function(req, file, cb) {
            cb(null, 'public/images/')
        },
        //修改文件名称
        filename: function(req, file, cb) {
            var fileFormat = (file.originalname).split(".");
            cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
        }
    })
    //加载配置
var upload = multer({
    storage: storage
});
// router.post('/upload', upload.single('image'), async(ctx, next) => {
//     ctx.body = {
//         filename: ctx.req.file.filename //返回文件名
//     }
// })

// router.get('/fileload/:name', async(ctx) => {
//     // const name = ctx.params.name;
//     // const path = `public/images/${name}.jpg`;

//     // ctx.attachment(path);
//     // await send(ctx, path);




//     var conf = {};

//     conf.name = "sheet";
//     //下面是示例，数据根据查表自己创建
//     // 定义列的名称以及数据类型
//     conf.cols = [{
//         caption: '姓名',
//         type: 'string'
//     }, {
//         caption: '性别',
//         type: 'string'
//     }, {
//         caption: '年龄',
//         type: 'number'
//     }];

//     // 定义row的数据
//     conf.rows = [
//         ['小名', '男', 24],
//         ['小红', '女', '20'],
//         ['小军', '未知', '33']
//     ];



//     const result = nodeExcel.execute(conf);
//     console.log(typeof result)

//     // // fs将文件写到内存 路径是以服务器开启为根目录
//     fs.writeFile('public/a.xlsx', result, 'binary', (err) => {
//         err ? console.log(err) : null;
//     });

//     const name = ctx.params.name;
//     const path = `public/${name}.xlsx`;

//     ctx.attachment(path);
//     await send(ctx, path);


// });


var FfmpegCommand = require('fluent-ffmpeg');

router.get('/api/rangeFile', async(ctx) => {


    var commend = new FfmpegCommand('http://localhost:3000/images/py.mp4') //可以是线上数据源哦，
        .outputOptions([])
        .on('start', function( str ) { console.log('转化', str ) })
        .on('progress', function( progress ) { console.log( '进行中，完成' + progress.percent + '%' )})
        .on('end' , function( str ) { console.log( '转换任务完成!' ) })
        .save('test.avi')
  
})



router.get('/', async(ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    })
})



router.post('/mgsave', MgController.save);
router.post('/mgupdata', MgController.updata);




router.post('/sendMail', MailController.sendMail);
router.post('/verityMail', MailController.verityMail);

router.post('/article/create', ArtileController.create);

//获取文章详情
router.get('/article/:id', ArtileController.detail);

// router.post('/regist', userController.create)

//密码登陆
router.post('/login', userController.login)

router.post('/regist', userController.create)



//获取用户信息
router.get('/getUserInfo', userController.getUserInfo)

router.post('/queryUserBook', userController.queryUserBook)

router.post('/delUser', userController.delUser)

router.get('/findUsers', userController.findUsers)


router.post('/updatePassword', userController.updatePassword)


router.post('/page', userController.page)



router.get('/UserbulkCreate', userController.UserbulkCreate)

router.get('/UserbulkUpdata', userController.UserbulkUpdata)

router.get('/douban', userController.douban)













module.exports = router