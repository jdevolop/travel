const fs = require('fs');
const path = require('path')

const mainPage = fs.createReadStream(path.join('./src/public', 'index.html'));

module.exports = {
    async main(ctx) {
        ctx.accepts('html');

        ctx.type = 'html';
        ctx.body = mainPage;
    }
};