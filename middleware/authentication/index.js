'use strict';

var Session = require('../../database/schema/session.js');

module.exports.checkAuthentication = function(req, res, next) {
    var token = req.query.token || req.params.token || req.body.token || req.headers['x-access-token'];
    if (req.session.user) {
        next();
    } else if (token) {
        Session.findOne({
            token: token
        }, function(err, sessionData) {
            if (err) {
                res.responseError('DATABASE_ERROR', 500, { databaseError: [err] });
            } else {
                if (sessionData) {
                    next();
                } else {
                    res.responseError('CUSTOM_ERROR', 401, { databaseError: ['SESSION_INVALID'] });
                }
            }
        })
    } else {
        res.responseError('CUSTOM_ERROR', 401, { databaseError: ['SESSION_INVALID'] });
    }
};
