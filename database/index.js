'use strict';


var mongoose = require('mongoose');
// config = require('../config.js');

mongoose.Promise = global.Promise;


module.exports.connect = function(app) {
  if (app.get('env') === 'production') {
    mongoose.connect(app.config.mongoUrl[1], {
      useMongoClient: true
    });
  } else {
    mongoose.connect(app.config.mongoUrl[0], {
      useMongoClient: true
    });
  }
  mongoose.connection.once('open', function() {
    console.log("Database Connected : ", mongoose.connection.port);
  });
  mongoose.connection.on('error', function(err) {
    if (err) {
      throw new Error('Database Connection Error ', err);
    }
  })


  //Attaching database models to app//
  app.db = {
    Sessions: require('./schema/session'),
    Users: require('./schema/user')
  }
};