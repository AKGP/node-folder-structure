'use strict';


module.exports = function(req, res, next) {
    var response = {
        success: true
    };
    res.responseSuccess = function(message, data) {
        response.message = message;
        response.data = data;
        res.statusCode = 200;
        res.send(response);
    };
    next();
};
