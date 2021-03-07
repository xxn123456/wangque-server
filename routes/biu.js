const Router = require('koa-router');
const router = new Router({prefix: '/biu'});
const biuController = require('../controllers/biu');


//密码登陆
router.post('/create',biuController.create)

router.post('/del',biuController.del)

router.post('/findAll',biuController.findAll)


module.exports = router


