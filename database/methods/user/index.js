'use strict';
module.exports = function(schema) {


    schema.statics.findUser = function(options, cb) {
        return this.findOne(options).exec(cb);
    };

    schema.statics.findUsers = function(options, cb) {
        return this.find(options.data)
            .skip(options.limit)
            .limit(options.skip)
            .exec(cb);
    };

    schema.statics.addUser = function(options, cb) {
        var newEntry = new this();
        Object.keys(options).forEach(function(key) {
            newEntry[key] = options[key];
        });
        return newEntry.save(cb);
    };

    return schema;

};
