const Router = require('koa-router');
const router = new Router({prefix: '/job'});
const jobController = require('../controllers/job');

//密码登陆
router.post('/create',jobController.create)

router.post('/findAll',jobController.findAll)

router.post('/findOne',jobController.findOne)

router.post('/update', jobController.update)

router.post('/del', jobController.del)

router.post('/batchDel',jobController.batchDel)

module.exports = router