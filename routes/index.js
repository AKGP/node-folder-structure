'use strict';

var userRouter = require('./userRoute.js');
module.exports = function(app) {
    app.use('/api/v1/users', userRouter);
};
