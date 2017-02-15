'use strict';

var bodyParser = require('body-parser'),
    successResponseBuilder = require('../utility/Response-builder/success.js'),
    errorResponseBuilder = require('../utility/Response-builder/error.js'),

    mo = require('method-override'),
    cors = require('cors');


module.exports = function(app) {
    app.use(bodyParser.json())
        .use(successResponseBuilder)
        .use(errorResponseBuilder)
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
