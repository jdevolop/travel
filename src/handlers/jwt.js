const jwtService = require('../services/jwt-service');
const Admin = require('../modules/admin/model/Admin');

module.exports = () => async (ctx, next) => {
	const { Authorization } = ctx.headers;

	if (Authorization) {
		try {
			const { login } = await jwtService.verify(Authorization);

			ctx.state.admin = await Admin.getAdminByLogin(login);
		} catch (e) {
			ctx.redirect('/login');
		}
	}

	await next();
};
