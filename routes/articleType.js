const Router = require('koa-router');
const router = new Router({prefix: '/articleType'});
const articleTypeController = require('../controllers/articleType.js');

const validator = require("../util/checkToken.js")

// 创建文章类别

router.post('/create',validator,articleTypeController.create)
router.post('/findAll',validator,articleTypeController.findAll)

router.post('/updata',validator,articleTypeController.updata)

router.post('/del',validator,articleTypeController.del)

router.post('/batchDel',validator,articleTypeController.batchDel)

module.exports = router