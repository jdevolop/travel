'use strict';

const Koa = require('koa');
const modules = require('./modules');
const path = require('path');
const serve = require('koa-static');
const Router = require('koa-router');
const multer = require('koa-multer');
const checkAdmin = require('./handlers/checkAdmin');
const initHandlers = require('./handlers');
const tourizm = require('./routes/main');
const admin = require('./routes/admin');

const app = new Koa();
const client = new Router();

initHandlers(app);



const storage = multer.diskStorage({ 
    destination: './src/public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = exports.upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 2 },
    fileFilter: function(req, file, cb) {
        fileCheck(file, cb);
    }
}).single('postImage');

function fileCheck(file, cb) {
    const types = /jpg|jpeg|png/;

    const extName = types.test(path.extname(file.originalname).toLowerCase());

    const mimetype = types.test(file.mimetype);

    if (mimetype && extName) {
        return cb(null, true);
    } else {
        cb('Error');
    }
 
}

app.use(serve(path.join(__dirname, 'public')));

client.get('/', tourizm.main);


app.use(modules);

client.get('/admin',  admin.admin);
client.post('/admin/upload',  admin.upload);
client.get('/login', admin.login);

app.use(client.routes());


app.use(async ctx => {
    ctx.status = 404;
		ctx.body = 'NOT FOUND!!!';
});


module.exports = app;
