'use strict';

var userRouter = require('./userRoute.js');
module.exports = function(app) {
    app.use('/api/v1/users', userRouter);


    /*
       always keep this Route in last
     */
    app.use('*', function(req, res, next) {

        res.responseError('SYSTEM_ERROR', 404, { systemError: ['THIS_API_ROUTE_NOT_FOUND'] });

    })

};
