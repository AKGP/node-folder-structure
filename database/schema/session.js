'use strict';
var mongoose = require('mongoose'),
    config = require('../../config.js'),
    staticMethod = require('../methods/user');


var sessionSchema = new mongoose.Schema({

        userId: {
            type: String
        },
        token: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }),

    Session = mongoose.model('session', staticMethod(sessionSchema));

sessionSchema.index({ "createdAt": 1 }, { expireAfterSeconds: config.tokenExpireTime });
module.exports = Session;
