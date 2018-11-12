const fs = require('fs');
const path = require('path');
const u = require('../app');
const axios = require('axios');
const posts = require('../modules/tourist/model/Posts')

module.exports = {
    async admin(ctx) {
        ctx.accepts('html');
        
        ctx.type = 'html';
        ctx.body = fs.createReadStream(path.join('./src/public', 'panel.html'));
    },

    async upload(ctx) {

       u.upload(ctx, async (err) => {
            const id = ctx.req.body.id;

           const image = ctx.req.file.filename;

            await posts.updateImage(id, image); 
       });

       ctx.redirect('/admin');

    },

    async login(ctx) {
        ctx.type = 'html';
        ctx.body = fs.createReadStream(path.join('./src/public', 'login.html'));
    },
} 