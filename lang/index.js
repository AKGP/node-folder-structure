'use strict';

var languageFile = require('./message');

module.exports = function getMessage(key, language) {

    return languageFile[language][key];

};
