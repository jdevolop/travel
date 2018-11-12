'use strict';

const knex = require('knex');
const config = require('./knexfile');

class BaseDao {
	constructor(knex) {
		this.knex = knex;
	}
}
// bu dev stadiada ishlidigan knex uchun config
module.exports = new BaseDao(knex(config.production));
