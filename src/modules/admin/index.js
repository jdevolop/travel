const Router = require('koa-router');
const adminConroller = require('./controllers/admin-controller');
const checkAdmin = require('../../handlers/checkAdmin');

const router = new Router();

router
	.post('/login', adminConroller.login)
	.post('/add/video', checkAdmin(), adminConroller.setVideo)
	.get('/videos/list', checkAdmin(), adminConroller.getVideoList);



module.exports = router.routes();
