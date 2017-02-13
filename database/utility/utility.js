'use strict';


exports.toLowerCase = function(value) {
    if (typeof value === "string") {
        return value.toLocaleLowerCase()
    }
};
