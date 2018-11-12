'use strict';

const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'verydificultsecret';

const IS_DEV = ENV === 'development';
const IS_PROD = ENV === 'production';

module.exports = {
    PORT,
    IS_DEV,
    IS_PROD,
    ENV,
    JWT_SECRET,
};