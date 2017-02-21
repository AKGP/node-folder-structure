var User = require('../../database/schema/user.js'),
    Session = require('../../database/schema/session.js'),
    async = require('async'),
    utility = require('../../utility');



exports.login = function(req, res, next) {
    var options = {
        query: {
            username: req.body.username
        }
    };

    function findUser(context) {
        var promise = new Promise(function(resolve, reject) {
            User.findUser(context.options, function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    if (data) {
                        resolve({ userData: data, requestBody: context.requestBody });
                    } else {
                        reject('INVALID_CREDENTIALS');
                    }
                }
            });
        });
        return promise;
    };

    function checkpassword(context) {
        var promise = new Promise(function(resolve, reject) {
            utility.validatePassword(context.requestBody.password, context.userData.password, function(err, res) {
                if (err) {
                    reject(err);
                } else {
                    if (!res) {
                        resolve({ userData: context.userData });
                    } else {
                        reject('INVALID_CREDENTIALS');
                    }
                }
            });
        });
        return promise;
    };

    function sessionHandle(context) {
        var promise = new Promise(function(resolve, reject) {
            Session.findElemant({ query: { userId: context.userData._id } }, function(err, sessionData) {
                if (err) {
                    reject(err);
                } else {
                    if (sessionData) {
                        resolve({ responseData: context.userData, sessionData: sessionData });
                    } else {
                        var token = utility.generateUniqueString();
                        Session.addValue({
                            userId: context.userData._id,
                            token: token
                        }, function(err, saveData) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve({ responseData: context.userData, sessionData: saveData });
                            }
                        });
                    }
                }
            });
        });
        return promise;
    };

    function errorHandler(err) {
        if (err) {
            if (err === 'INVALID_CREDENTIALS') {
                res.responseError('CUSTOM_ERROR', 401, { customError: ['INVALID_CREDENTIALS'] });
            } else {
                res.responseError('DATABASE_ERROR', 500, { databaseError: [err] });
            }
        }
    };
    findUser({ options: options, requestBody: req.body })
        .then(checkpassword)
        .then(sessionHandle)
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

    function findUser(context) {
        var promise = new Promise(function(resolve, reject) {
            User.findUser(context.options, function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    if (data) {
                        reject('ACCOUNT_EXITS');
                    } else {
                        resolve({ requestBody: req.body });
                    }
                }
            });
        });
        return promise;
    };

    function generateHash(context) {
        var promise = new Promise(function(resolve, reject) {
            utility.generateHash(context.requestBody.password, function(err, hash) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ hash: hash })
                }
            });
        });
        return promise;
    };

    function addUser(context) {
        var promise = new Promise(function(resolve, reject) {
            User.addUser({
                password: context.hash,
                name: req.body.name,
                address: req.body.address,
                username: req.body.email,
                email: req.body.email
            }, function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ responseData: data })
                }
            });
        });
        return promise;
    };


    function errorHandler(err) {
        if (err) {
            if (err === 'ACCOUNT_EXITS') {
                res.responseError('CUSTOM_ERROR', 401, { customError: ['ACCOUNT_EXITS'] });
            } else {
                res.responseError('DATABASE_ERROR', 500, { databaseError: [err] });
            }
        }
    };

    findUser({ options: options })
        .then(generateHash)
        .then(addUser)
        .then(function(data) {
            res.responseSuccess('SIGNUP_SUCCESS', context.responseData);
        })
        .catch(errorHandler)


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
                res.responseSuccess('ALL USERS', data);
            } else {
                res.responseError('CUSTOM_ERROR ', 401, { customError: ['NOT_FOUND '] });
            }
        }
    })
};
