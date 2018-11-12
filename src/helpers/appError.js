'use strict';

class AppError extends Error {
	constructor({ status, message}) {
		super();
		this.status = status;
		this.message = message;
		Error.captureStackTrace(this, AppError);
	}
}

const error = new AppError();
module.exports = error;