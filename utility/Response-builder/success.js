'use strict';


module.exports = function(req, res, next) {
    var response = {
        success: true
    };
    res.responseSuccess = function(message, data) {
        response.message = message;
        response.data = data;
        if (arguments[2]) {
            response.utility = arguments[2];
        }
        res.statusCode = 200;
        res.send(response);
    };
    next();
};
