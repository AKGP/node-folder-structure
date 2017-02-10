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
        return this.create(options)
            .exec(cb);
    };

    return schema;

};
