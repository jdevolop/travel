'use strict';

module.exports = () => async (ctx, next) => {
    try {
        await next();
    } catch ({ status = 500, message = 'Server error' }) {

                ctx.status = status;
                ctx.body = { status, message };


    }
}

