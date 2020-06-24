'use strict';

const initializeController = function (controller, model) {
    controller.find = function (req, res, next) {
        const query = {...req.query};
        const {page = 1, limit = 10, sort = '-createdAt'} = query;

        const excludedFields = ['page', 'limit', 'sort'];
        excludedFields.forEach(el => delete query[el]);

        const sortBy = sort.split(',').join(' ');

        let queryStr = JSON.stringify(query);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|eq|ne)\b/g, match => `$${match}`);

        const fModel = model
            .find(JSON.parse(queryStr))
            .sort(sortBy)
            .limit(limit * 1)
            .skip((page - 1) * limit);

        fModel
            .then(function (resp) {
                if (!resp) {
                    next();
                } else {
                    res.ok({resp: resp, currentPage: page});
                }
            })
            .catch(function (err) {
                next(err);
            });
    };

    controller.findOne = function (req, res, next) {
        const id = req.params.id;
        const fClient = model.findById(id);

        fClient
            .then(function (client) {
                if (client) {
                    res.ok(client);
                } else {
                    next();
                }
            })
            .catch(function (err) {
                next(err);
            });
    };

    controller.create = function (req, res, next) {
        const data = req.body;

        model.create(data)
            .then(function (resp) {
                res.ok(resp);
            })
            .catch(function (err) {
                next(err);
            });
    };

    controller.updateOne = function (req, res, next) {
        const id = req.params.id;
        const data = req.body;

        model.findByIdAndUpdate(id, data)
            .then(function (resp) {
                if (!resp) {
                    next();
                } else {
                    res.ok(resp);
                }
            })
            .catch(function (err) {
                next(err);
            });
    };

    controller.deleteOne = function (req, res, next) {
        const id = req.params.id;

        model.findByIdAndRemove(id)
            .then(function (resp) {
                res.ok(resp);
            })
            .catch(function (err) {
                next(err);
            });
    };
};

module.exports = initializeController;
