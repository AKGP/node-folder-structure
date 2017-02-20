var User = require('../../database/schema/user.js'),
    Session = require('../../database/schema/session.js'),
    async = require('async'),
    helper = require('../helper.js'),
    utility = require('../../utility');


var UserHelper = helper.user;

exports.login = function(req, res, next) {
    var options = {
        query: {
            username: req.body.username
        }
    };
    /* async.waterfall([
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
        },
        function(data, cb) {
            Session.findElemant({ query: { userId: data._id } }, function(err, sessionData) {
                if (err) {
                    res.responseError('DATABASE_ERROR', 500, { databaseError: [err] });
                } else {
                    if (sessionData) {
                        req.activeUser = sessionData;
                        res.responseSuccess('LOGIN_SUCCESS', utility.removeConfidentialData(data, ['username', 'password']), { token: sessionData.token });
                    } else {
                        var token = utility.generateUniqueString();
                        Session.addValue({
                            userId: data._id,
                            token: token
                        }, function(err, saveData) {
                            if (err) {
                                cb(err);
                            } else {
                                req.activeUser = saveData;
                                res.responseSuccess('LOGIN_SUCCESS', utility.removeConfidentialData(data, ['username', 'password']), { token: token });
                            }
                        });
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
        }
    });
*/

    function errorHandler(err) {
        if (err) {
            if (err === 'INVALID_CREDENTIALS') {
                res.responseError('CUSTOM_ERROR', 401, { customError: ['INVALID_CREDENTIALS'] });
            } else {
                res.responseError('DATABASE_ERROR', 500, { databaseError: [err] });
            }
        }
    }
    UserHelper.findUser({ options: options, requestBody: req.body })
        .then(UserHelper.checkpassword)
        .then(UserHelper.sessionHandle)
        .then(function(data) {
            req.activeUser = data.responseData;
            res.responseSuccess('LOGIN_SUCCESS', utility.removeConfidentialData(data.responseData, ['username', 'password']), { token: data.sessionData.token });
        })
        .catch(errorHandler);


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


exports.editProfile = function(req, res, next) {
    var options = {
        query: req.body.userId,
        update: {
            name: req.body.name
        }
    }
    User.editUser(options, function(err, data) {
        if (err) {
            res.responseError('DATABASE_ERROR', 500, { databaseError: [err] });
        } else {
            res.responseSuccess('UPDATE_SUCCESS', data);
        }
    })
};

exports.searchUser = function(req, res, next) {
    var options = {
        query: {}
    };
    User.findUsers(options, function(err, data) {
        if (err) {
            res.responseError('DATABASE_ERROR', 500, { databaseError: [err] });
        } else {
            if (data.length) {
                res.responseError('CUSTOM_ERROR ', 401, { customError: ['NOT_FOUND '] });
            } else {
                res.responseSuccess('UPDATE_SUCCESS', data);
            }
        }
    })
};
