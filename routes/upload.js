const Router = require('koa-router');
const router = new Router({prefix: '/upload'});

const multer = require('koa-multer');
var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, 'public/images/article/')
  },
  //修改文件名称
  filename: function (req, file, cb) {
    console.log("原生文件名称",file.originalname);
    var fileFormat = (file.originalname).split(".");
    console.log("新文件明",Date.now() + "." + fileFormat[fileFormat.length - 1])
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
//加载配置
var upload = multer({ storage: storage });


//密码登陆
router.post('/articleImg',upload.single('articleImg'), async (ctx, next) => {
     try{
        ctx.response.status = 200;
          ctx.body = {
            code:200,
            url: '/images/article/'+ctx.req.file.filename,
            des: "文章图片上传成功"
          }
     } catch(err){
        ctx.response.status = 416;
          ctx.body = {
            code:416,
            des: "文章图片上传失败",
            data:err
          }

     }
   
    })

module.exports = router


