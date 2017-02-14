'use strict';


module.exports = function(req, res, next) {

    var response = {
        success: false
    };
    res.responseError = function(errorType, message, status) {
        switch (message) {
            case 'DATABASE_ERROR':
                response.message = 'DATABASE_ERROR';
                res.statusCode = status;
                break;
            case 'CUSTOM_ERROR':
                response.message = message;
                res.statusCode = status;
                break;
            default:
                response.message = message;
                res.statusCode = status;
                break;

        }
        if (arguments[3]) {
            response.err = arguments[3];
        }
        res.send(response);
    };
    next();
};
