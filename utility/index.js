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


module.exports = utility;
