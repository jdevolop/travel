'use strict';

const dao = require('../../conf/Base');
const bcrypt = require('bcryptjs');

class Admin {
    constructor() {
        this.table = 'Admin';
    }

    async createAdminTable() {
        let exist = await dao.knex.schema.withSchema('public').hasTable(this.table);

        if (!exist) {
            await dao.knex.schema.withSchema('public').createTable(this.table, (t) => {
                t.increments('id');
                t.string('login', 20).unique();
                t.string('password', 60);
                t.timestamp('createdAt').defaultTo(dao.knex.fn.now());
                t.timestamp('updatedAt');
            });

            console.log(`${this.table} created`);
        } else {
            console.error(`${this.table} is already created`);
        }
    }

    async addAdmin({ login, pwd }) {

        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(pwd, salt);

        await dao.knex
                .insert({ login, password })
                .from(this.table);

        return true;
    }

    async getAdminByLogin(login) {
        const admin = await dao.knex
                        .select('login', 'password')
                        .from(this.table)
                        .where({ login });

        return admin;
    }
}

const admin = new Admin();


module.exports = admin;
