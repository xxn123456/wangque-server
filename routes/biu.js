const Router = require('koa-router');
const router = new Router({prefix: '/biu'});
const biuController = require('../controllers/biu');

const validator = require("../util/checkToken.js")


router.post('/create',validator,biuController.create)

router.post('/del',validator,biuController.del)

router.post('/findAll',validator,biuController.findAll)


module.exports = router


