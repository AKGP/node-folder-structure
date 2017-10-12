'use strict';

module.exports = function(app) {
  var userRouter = require('./userRoute')(app);
  app.use('/api/v1/users', userRouter);


  /*
     always keep this Route in last
   */
  app.use('*', function(req, res, next) {
    res.responseError('SYSTEM_ERROR', 404, { systemError: ['THIS_API_ROUTE_NOT_FOUND'] });
  })
};