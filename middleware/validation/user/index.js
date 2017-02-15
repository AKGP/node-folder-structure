'use strict';
var utility = require('../../../utility');

module.exports.signUpValidation = function(req, res, next) {
    var responseObject = {
        success: true,
        message: []
    };
    if (req.body.email) {
        if (!utility.isValidate.email(req.body.email)) {
            responseObject.success = false;
            responseObject.message.push({ email: 'EMAIL_FORMAT_VALIDATION' })
        }
    } else {
        responseObject.success = false;
        responseObject.message.push({ email: 'EMAIL_REQUIRED_FIELD' })
    }
    if (!req.body.name) {
        responseObject.success = false;
        responseObject.message.push({ name: 'NAME_REQUIRED_FILED' })
    }
    if (!req.body.address) {
        responseObject.success = false;
        responseObject.message.push({ address: 'ADDRESS_REQUIRED_FILED' })
    }
    if (!req.body.password) {
        responseObject.success = false;
        responseObject.message.push({ password: 'PASSWORD_REQUIRED_FILED' })
    }
    if (responseObject.success) {
        next();
    } else {
        res.responseError('CUSTOM_ERROR', 400, { validationError: responseObject.message });
    }
};
