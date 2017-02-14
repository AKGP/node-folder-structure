'use strict';
var utility = require('../../../utility');

module.exports.signUpValidation = function(req, res, next) {
    var responseObject = {
        success: true,
        err: {}
    };
    if (req.body.email) {
        if (utility.isValidate.email(req.body.email)) {
            responseObject.success = false;
        }
    } else {
        responseObject.success = false;
    }
    if (!req.body.name) {
        responseObject.success = false;
    }
    if (!req.body.address) {
        responseObject.success = false;
    }
    if (!req.body.password) {
        responseObject.success = false;
    }
    if (responseObject.success) {
        next();
    } else {
        res.responseError('CUSTOM_ERROR', 'VALIDATION_FAILED', 400);
    }
};
