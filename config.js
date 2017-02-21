'use strict';

exports.port = process.env.PORT || 8888;

exports.mongoUrl = ['mongodb://localhost/test_node'];

exports.tokenExpireTime = 60; // This is token expire time. Here it is 3600 seconds.
