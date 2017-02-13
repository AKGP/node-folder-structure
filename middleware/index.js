'use strict';

var bodyParser = require('body-parser'),
    responseBuilder = require('../utility/Response-builder/success.js'),
    mo = require('method-override'),
    cors = require('cors');


module.exports = function(app) {
    app.use(bodyParser.json())
        .use(responseBuilder)
        .use(bodyParser.urlencoded({
            extended: true
        }))
        .use(mo())

    return app;
};
