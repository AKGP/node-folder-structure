'use strict';


var express = require('express'),
    app = express(),
    db = require('./database'),
    routes = require('./routes'),
    config = require('./config');


app = require('./middleware')(app);

db.connect(app);

routes(app);


app.listen(config.port, function() {
    console.log('The server is running on ' + config.port);
});
