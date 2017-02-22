'use strict';

var langFile = require('../../lang'),
    async = require('async');
process.on('uncaughtException', function(err) {
    if (err) {
        console.log('This Error is occured in Runtime', err);
    }
});

module.exports = function(req, res, next) {

    var response = {
        success: false,
        err: {
            systemError: [],
            databaseError: [],
            validationError: [],
            customError: []
        }
    };
    res.responseError = function(errorType, status) {
        switch (errorType) {
            case 'DATABASE_ERROR':
                res.statusCode = status;
                break;
            case 'CUSTOM_ERROR':
                res.statusCode = status;
                break;
            default:
                res.statusCode = status;
                break;

        }
        if (arguments[2]) {
            for (var key in arguments[2]) {
                for (var key1 in response.err) {
                    if (key === key1) {
                        response.err[key1] = arguments[2][key]
                    }
                }
            }
        }
        res.send(response);
    };
    next();
};
