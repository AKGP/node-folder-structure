'use strict';

var langFile = require('../../lang'),
  async = require('async');
process.on('uncaughtException', function(err) {
  if (err) {
    console.log('This Error is occured in Runtime', err);
  }
});

module.exports = function(req, res, next) {

  var response = {
    success: false,
    error: ''
    // error: {
    //   systemError: '',
    //   databaseError: '',
    //   validationError: '',
    //   customError: ''
    // }
  };
  res.responseError = function(errorType, status, err) {
    console.log('err handler', err);
    // switch (errorType) {
    //   case 'DATABASE_ERROR':
    //     res.statusCode = status;
    //     response.error = err;
    //     break;
    //   case 'CUSTOM_ERROR':
    //     res.statusCode = status;
    //     response.error = err;
    //     break;
    //   default:
    //     res.statusCode = status;
    //     break;

    // }

    res.statusCode = status;
    response.error = err;
    res.send(response);
  };
  next();
};