'use strict';

var mongoose = require('mongoose'),
    staticMethod = require('./methods/user'),
    utility = require('./utility');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        set: utility.toLowerCase
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        set: utility.toLowerCase
    },
    address: {
        type: String,
        required: true,
        set: utility.toLowerCase
    }

});
User = mongoose.model('user', staticMethod(userSchema));



module.exports = User;
