'use strict';


var mongoose = require('mongoose'),
    config = require('../config.js');

module.exports.connect = function(app) {
    if (app.get('env') === 'production') {
        mongoose.connect(config.mongoUrl[1]);
    } else {
        mongoose.connect(config.mongoUrl[0]);
    }
    mongoose.connection.once('open', function() {
        console.log("Database Connected : ", mongoose.connection.port);
    });
    mongoose.connection.on('error', function(err) {
        if (err) {
            throw new Error('Database Connection Error ', err);
        }
    })
};
