const Router = require('koa-router');
const router = new Router({prefix: '/other'});
const otherController= require('../controllers/other');


router.post('/findAll', otherController.findAll)


module.exports = router