const Router = require('koa-router');
const router = new Router({prefix: '/carousel'});
const carouselController = require('../controllers/carousel');

const validator = require("../util/checkToken.js")

//密码登陆
router.post('/create', validator,carouselController.create)

router.post('/findAll',carouselController.findAll)


router.post('/update',validator, carouselController.updata)

router.post('/del', validator,carouselController.del)

router.post('/batchDel',validator,carouselController.batchDel)

router.post('/queryCarousel',validator,carouselController.queryCarousel)



module.exports = router