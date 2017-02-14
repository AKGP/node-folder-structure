'use strict'

var module, exports;

var router = require('express').Router(),
    userValidation = require('../middleware/validation/user'),
    user = require('../controller/user/controller.js');


router.post('/signup', userValidation.signUpValidation, user.signup);
router.post('/login', user.login);

module.exports = router;
