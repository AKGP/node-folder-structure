'use strict';


module.exports = function(app) {

  var bodyParser = require('body-parser'),
    // successResponseBuilder = require('../utility/Response-builder/success.js'),
    // errorResponseBuilder = require('../utility/Response-builder/error.js'),

    mo = require('method-override'),
    cors = require('cors');


  app.utility = require('../utility');
  app.config = require('../config');
  app.use(bodyParser.json())
    .use(app.utility.responseBuilder.success)
    .use(app.utility.responseBuilder.error)
    .use(bodyParser.urlencoded({
      extended: true
    }))
    /** It is for Session purpose */
    /*.use(require('express-session')({
        resave: true,
        saveUninitialized: true,
        secret: config.cryptoKey,
        rolling: true,
        store: new mongoStore({
            mongooseConnection: mongoose.connection
        }),
        cookie: {
            maxAge: 31536000 * 1000
        }
    }))*/
    .use(mo())

  return app;
};