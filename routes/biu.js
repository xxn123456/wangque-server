const Router = require('koa-router');
const router = new Router({prefix: '/biu'});
const biuController = require('../controllers/biu');


router.post('/create',biuController.create)

router.post('/del',biuController.del)

router.post('/findAll',biuController.findAll)


module.exports = router


