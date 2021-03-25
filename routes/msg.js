const Router = require('koa-router');
const router = new Router({prefix: '/msg'});
const msgController = require('../controllers/msg.js');

// 创建文章类别

router.post('/create', msgController.create)
router.post('/findAll', msgController.findAll)

router.post('/updata', msgController.updata)

router.post('/del', msgController.del)

router.post('/batchDel', msgController.batchDel)

module.exports = router