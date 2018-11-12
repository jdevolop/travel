module.exports = () => async (ctx, next) => {
		if (!ctx.state.admin) {
				ctx.throw(404, 'Not found');
		}

		await next();
};
