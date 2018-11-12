const Router = require('koa-router');
const touristConroller = require('./controllers/tourist-controller');
const checkAdmin = require('../../handlers/checkAdmin');


const router = new Router({ prefix: '/post' });

router
		.get('/', checkAdmin(), touristConroller.getPosts)
		.get('/:title', checkAdmin(), touristConroller.getByTitle)
		.post('/add', touristConroller.add)
		.delete('/title/:title', checkAdmin(), touristConroller.delByTitle)
		.delete('/rm', checkAdmin(), touristConroller.delById)
		.put('/title/:old_title', checkAdmin(), touristConroller.updateByTitle)
		.put('/:id', checkAdmin(), touristConroller.updateById);



module.exports = router.routes();
