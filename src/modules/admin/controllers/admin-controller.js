'use strict';

const Admin = require('../model/Admin');
const bcrypt = require('bcryptjs');
const jwtService = require('../../../services/jwt-service');

const videos = [];

module.exports = {
    async login(ctx) {
        const { login, password } = ctx.request.body;

        if (!login || !password) {
            ctx.throw(400, 'login or password is wrong');
        }

        const admin = await Admin.getAdminByLogin(login);

        if (!admin.length) {
            ctx.throw(400, 'login or password is wrong');
        }

        const isAdmin = bcrypt.compareSync(password, admin[0].password);

        if (!isAdmin) {
		        ctx.throw(400, 'login or password is wrong');
        }

        const token = jwtService.getToken({ login }, { expiresIn: '2h' });

        ctx.body = { data: token };

    },

    async setVideo(ctx) {
        const { src } = ctx.request.body;

        if (!src) {
            ctx.throw(400, 'src required');
        }

        videos.push(src);

        ctx.body = { success: true }
    },

    async getVideoList(ctx) {
        ctx.body = { data: videos };
    }

}

