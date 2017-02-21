'use strict';
var mongoose = require('mongoose'),
    config = require('../../config.js'),
    staticMethod = require('../methods/session');


var sessionSchema = new mongoose.Schema({

        userId: {
            type: String
        },
        token: {
            type: String
        },
        createdAt: {
            type: Date,
            expires: config.tokenExpireTime, // in seconds
            default: Date.now()
        }
    }),

    Session = mongoose.model('session', staticMethod(sessionSchema));

module.exports = Session;
