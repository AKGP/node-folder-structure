'use strict';
module.exports = app => {

  var login = function(req, res, next) {
    var options = {
      query: {
        username: req.body.username
      }
    };

    function findUser(context) {
      var promise = new Promise(function(resolve, reject) {
        app.db.Users.findUser(context.options, function(err, data) {
          if (err) {
            reject(err);
          } else {
            if (data) {

              resolve({ userData: data, requestBody: context.requestBody });
            } else {
              reject('INVALID_CREDENTIALS');
            }
          }
        });
      });
      return promise;
    };

    function checkpassword(context) {
      var promise = new Promise(function(resolve, reject) {
        app.utility.validatePassword(context.requestBody.password, context.userData.password, function(err, res) {
          if (err) {
            reject(err);
          } else {
            if (!res) {

              resolve({ userData: context.userData });
            } else {
              reject('INVALID_CREDENTIALS');
            }
          }
        });
      });
      return promise;
    };

    function sessionHandle(context) {
      var promise = new Promise(function(resolve, reject) {
        app.Sessions.findElemant({ query: { userId: context.userData._id } }, function(err, sessionData) {
          if (err) {
            reject(err);
          } else {
            if (sessionData) {

              resolve({ responseData: context.userData, sessionData: sessionData });
            } else {
              var token = app.utility.generateUniqueString();
              app.Sessions.addValue({
                userId: context.userData._id,
                token: token
              }, function(err, saveData) {
                if (err) {
                  reject(err);
                } else {
                  resolve({ responseData: context.userData, sessionData: saveData });
                }
              });
            }
          }
        });
      });
      return promise;
    };

    function errorHandler(err) {
      if (err) {
        if (err === 'INVALID_CREDENTIALS') {
          res.responseError('CUSTOM_ERROR', 401, { customError: [app.utility.getLang('INVALID_CREDENTIALS', 'en-us')] });
        } else {
          res.responseError('DATABASE_ERROR', 500, { databaseError: [err] });
        }
      }
    };
    findUser({ options: options, requestBody: req.body })
      .then(checkpassword)
      .then(sessionHandle)
      .then(function(data) {
        req.activeUser = data.responseData;
        res.responseSuccess('LOGIN_SUCCESS', app.utility.removeConfidentialData(data.responseData, ['username', 'password']), { token: data.sessionData.token });
      })
      .catch(errorHandler);


  };


  var signup = function(req, res, next) {
    var options = {
      query: {
        usernmae: req.body.usernmae
      }
    };

    function findUser(context) {
      var promise = new Promise(function(resolve, reject) {
        app.db.Users.findUser(context.options, function(err, data) {
          if (err) {
            reject(err);
          } else {
            if (data) {
              reject('ACCOUNT_EXITS');
            } else {
              resolve({ requestBody: req.body });
            }
          }
        });
      });
      return promise;
    };

    function generateHash(context) {
      var promise = new Promise(function(resolve, reject) {
        app.utility.generateHash(context.requestBody.password, function(err, hash) {
          if (err) {
            reject(err);
          } else {
            resolve({ hash: hash })
          }
        });
      });
      return promise;
    };

    function addUser(context) {
      var promise = new Promise(function(resolve, reject) {
        app.db.Users.addUser({
          password: context.hash,
          name: req.body.name,
          address: req.body.address,
          username: req.body.email,
          email: req.body.email
        }, function(err, data) {
          if (err) {
            reject(err);
          } else {
            resolve({ responseData: data })
          }
        });
      });
      return promise;
    };


    function errorHandler(err) {
      // console.log('err', err);
      if (err) {
        if (err === 'ACCOUNT_EXITS') {
          res.responseError('CUSTOM_ERROR', 401, app.utility.getLang('ACCOUNT_EXITS', 'en-us'));
        } else {
          res.responseError('DATABASE_ERROR', 500, { databaseError: [err] });
        }
      }
    };

    findUser({ options: options })
      .then(generateHash)
      .then(addUser)
      .then(function(data) {
        res.responseSuccess('SIGNUP_SUCCESS', data.responseData);
      })
      .catch(errorHandler)


  };


  var editProfile = function(req, res, next) {
    var options = {
      query: req.body.userId,
      update: {
        name: req.body.name
      }
    }
    app.db.Users.editUser(options, function(err, data) {
      if (err) {
        res.responseError('DATABASE_ERROR', 500, { databaseError: [err] });
      } else {
        res.responseSuccess('UPDATE_SUCCESS', data);
      }
    })
  };

  var searchUser = function(req, res, next) {
    var options = {
      query: {}
    };
    app.db.Users.findUsers(options, function(err, data) {
      if (err) {
        res.responseError('DATABASE_ERROR', 500, { databaseError: [err] });
      } else {
        if (data.length) {
          res.responseSuccess('ALL USERS', data);
        } else {
          res.responseError('CUSTOM_ERROR ', 401, { customError: [app.utility.getLang('NOT_FOUND', 'en-us')] });
        }
      }
    })
  };



  return {
    'login': login,
    'signup': signup,
    'editProfile': editProfile,
    'searchUser': searchUser
  }
}