'use strict';


module.exports = function(req, res, next) {

    res.response = function() {
        res.send(req.params);
    };
    next();
};
