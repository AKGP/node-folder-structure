'use strict';

var scaling = require('./scaling.js');

scaling.startScaling(function() {
  var express = require('express'),
    app = express(),
    db = require('./database'),
    routes = require('./routes'),
    config = require('./config');

  // bind middleware with app
  app = require('./middleware')(app);


  // connect Database with app.
  db.connect(app);


  //Intialize the route with app.
  routes(app);


  app.listen(config.port, function() {
    console.log('The server is running on ' + config.port);
  });
});