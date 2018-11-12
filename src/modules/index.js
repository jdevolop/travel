const Router = require('koa-router');
const tourist = require('./tourist');
const admin = require('./admin');

const router = new Router({ prefix: '/api' });

router.use(tourist);
router.use(admin);



module.exports = router.routes();

