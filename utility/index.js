var async = require('async'),
    bcrypt = require('bcrypt');


var utility = {
    async: async
};

/* 
   This function is used for generate Unique String
 */

utility.generateUniqueString = function() {

    var Puid = require('puid');
    var puid = new Puid();
    return puid.generate();
};

/**
 * This function is used for generate Random number.
 * @param  {Number}   length  This for number length.
 * @param  {Function} cb      This callback function.
 */
utility.generateRandomNumber = function(length, cb) {
    var codeString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz12345678',
        output = '',
        index;
    if (!length) {
        length = 6;
    }
    for (var i = 0; i < length; i++) {
        index = Math.floor(Math.random() * codeString.length);

        if (index === 1) {
            index = index - 1;
        }
        output += codeString[index];
    }
    output += "1aA@";
    cb(output);
};

/**
 * This function is returned the encrypt string 
 * @param  {String}   value     The normal string 
 * @param  {Function} cb        The callback function.
 */
utility.generateHash = function(value, cb) {
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return cb(err);
        } else {
            bcrypt.hash(value, salt, function(err, hash) {
                if (err) {
                    cb(err);
                } else {
                    cb(null, hash);
                }
            });
        }
    });
};

utility.validatePassword = function(password, hash, done) {
    bcrypt.compare(password, hash, function(err, res) {
        done(err, res);
    });
};


utility.isValidate = {
    email: function(email) {
        return /^[a-zA-Z0-9\-\_\.\+]+@[a-zA-Z0-9\-\_\.]+\.[a-zA-Z0-9\-\_]+$/.test(email);
    },
    mobile: function(mobile) {
        return /^(\+91)?\d{10}$/.test(mobile);
    },
    password: function(password) {
        /** atleast one capital,one small,one number and one special char and minimum 7 digit */
        return /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/.test(password);
    },
    isNumeric: function(input) {
        return isFinite(input)
    },
    isString: function(input) {
        return (typeof input === "string" && !isFinite(input) && input !== "");
    },
    isUrl: function(input) {
        return /^(https?)?(:)(\/\/)(www.)?[a-zA-Z0-9_]+\.[a-zA-Z]+((\/([\w]+)?)*)?$/g.test(input);
    }
};

/**
 * This function is used for remove confidential data from http response.
 * @param  {Object} data This mongoose object 
 * @param  {Array} arr   array field name which you want remove.
 * @return {object}      This will return the desired object
 */
utility.removeConfidentialData = function(data, arr) {


    var data = JSON.parse(JSON.stringify(data));

    arr.forEach(function(each) {

        if (data[each]) {
            delete data[each]
        }
    });
    return data;

};

module.exports = utility;
