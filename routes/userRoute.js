'use strict'

var module, exports;

var router = require('express').Router(),
    userValidation = require('../middleware/validation/user'),
    authentication = require('../middleware/authentication'),
    user = require('../controller/user/controller.js');

/**with out session **/
router.post('/signup', userValidation.signUpValidation, user.signup);
router.post('/login', user.login);



/** with Session */
router.post('/secure/*', authentication.checkAuthentication);
router.post('/secure/search-user', user.searchUser);
router.post('/secure/edit-profile', user.editProfile);

module.exports = router;
