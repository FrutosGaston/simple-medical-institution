const log = require('../logger');
var response = require('../response');

module.exports = function (err, req, res, next) {
    response(req, res, next);
    log.error(err);
    if (err.statusCode === 404) {
        res.notFound(err);
    } else if (err.statusCode === 401) {
        res.unauthorized(err);
    } else if (err.statusCode === 400) {
        res.badRequest(err);
    } else if (err.statusCode === 403) {
        res.forbidden(err);
    } else if (err.statusCode === 422) {
        res.unprocessable(err);
    } else {
        res.serverError(err);
    }
};
