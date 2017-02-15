var User = require('../../database/schema/user.js'),
    async = require('async'),
    utility = require('../../utility');



exports.login = function(req, res, next) {
    var options = {
        query: {
            usernmae: req.body.usernmae
        }
    };
    async.waterfall([
        function(cb) {
            User.findUser(options, function(err, data) {
                if (err) {
                    cb(err);
                } else {
                    if (data) {
                        cb(null, data);
                    } else {
                        cb('INVALID_CREDENTIALS');
                    }
                }
            });
        },
        function(data, cb) {
            utility.validatePassword(req.body.password, data.password, function(err, res) {
                if (err) {
                    cb(err);
                } else {
                    if (!res) {
                        cb('INVALID_CREDENTIALS');
                    } else {
                        cb(null, data);
                    }
                }
            });
        }
    ], function(err, data) {
        if (err) {
            if (err === 'INVALID_CREDENTIALS') {
                res.responseError('CUSTOM_ERROR', 401, { customError: ['INVALID_CREDENTIALS'] });
            } else {
                res.responseError('DATABASE_ERROR', 500, { databaseError: [err] });
            }
        } else {
            res.responseSuccess('LOGIN_SUCCESS', utility.removeConfidentialData(data, ['username', 'password']));
        }
    });

};


exports.signup = function(req, res, next) {
    var options = {
        query: {
            usernmae: req.body.usernmae
        }
    };
    async.waterfall([
        function(cb) {
            User.findUser(options, function(err, data) {
                if (err) {
                    cb(err);
                } else {
                    if (data) {
                        cb('ACCOUNT_EXITS');
                    } else {
                        cb(null, data);
                    }
                }
            });
        },
        function(data, cb) {
            utility.generateHash(req.body.password, function(err, hash) {
                if (err) {
                    cb(err);
                } else {
                    cb(null, hash);
                }
            });
        },
        function(hash, cb) {
            User.addUser({
                password: hash,
                name: req.body.name,
                address: req.body.address,
                username: req.body.email,
                email: req.body.email
            }, function(err, data) {
                if (err) {
                    cb(err);
                } else {
                    cb(null, data);
                }
            });
        }
    ], function(err, data) {
        if (err) {
            if (err === 'ACCOUNT_EXITS') {
                res.responseError('CUSTOM_ERROR', 401, { customError: ['ACCOUNT_EXITS'] });
            } else {
                res.responseError('DATABASE_ERROR', 500, { databaseError: [err] });
            }
        } else {
            res.responseSuccess('SIGNUP_SUCCESS', data);
        }
    });
};
