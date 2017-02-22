'use strict';

var langFile = require('../../lang');

module.exports = function(req, res, next) {
    var response = {
        success: true
    };
    res.responseSuccess = function(message, data) {
        response.message = langFile(message, 'en-us');
        response.data = data;
        if (arguments[2]) {
            response.utility = arguments[2];
        }
        res.statusCode = 200;
        res.send(response);
    };
    next();
};
