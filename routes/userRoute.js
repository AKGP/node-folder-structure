'use strict'

var module, exports;

var router = require('express').Router(),
    user = require('../controller/user/controller.js');


router.post('/signup', user.signup);
router.post('/login', user.login);

module.exports = router;
