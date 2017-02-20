'use strict';

var utility = require('../utility'),
    User = require('../database/schema/user.js'),
    Session = require('../database/schema/session.js');

function Helper() {
    return {
        user: {
            findUser: function(context) {
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
            },
            checkpassword: function(context) {
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
            },
            sessionHandle: function(context) {
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
            }

        }
    }
};
module.exports = new Helper();
