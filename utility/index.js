var async = require('async'),
    bcrypt = require('bcrypt');


var utility = {
    async: async
};

utility.generateHash = function(password, cb) {
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return cb(err);
        } else {
            bcrypt.hash(password, salt, function(err, hash) {
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

module.exports = utility;
