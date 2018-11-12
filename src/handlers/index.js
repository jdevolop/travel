'use strict';

const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const jwt = require('./jwt');
const error = require('./error');
const helmet = require('koa-helmet');
const cors = require('koa2-cors');

const { IS_DEV } = require('../config');

module.exports = (app) => {
    if (IS_DEV) {
        app.use(logger());
    }
    app.use(error());
    app.use(bodyParser({
        formLimit: '2mb',
        enableTypes: ['json', 'form'],
        extendTypes: {
            json: ['application/x-javascript'],
        }
    }));
    app.use(cors());
    app.use(helmet());
    app.use(jwt());
};

