const Router = require('koa-router');
const router = new Router({prefix: '/msg'});
const msgController = require('../controllers/msg.js');

const validator = require("../util/checkToken.js")

// 创建文章类别

router.post('/create', validator,msgController.create)
router.post('/findAll', validator,msgController.findAll)


router.post('/findMsgByArticle', validator,msgController.findMsgByArticle)

router.post('/updata', validator,msgController.updata)

router.post('/del',validator, msgController.del)




router.post('/batchDel', validator,msgController.batchDel)

module.exports = router