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
        .use(mo())

    return app;
};
