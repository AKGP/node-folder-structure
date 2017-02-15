'use strict';
module.exports = function(schema) {


    schema.statics.findUser = function(options, cb) {

        var query = this.findOne(options.query);

        if (options.populateQuery) {
            query.populate(options.populateQuery) // [{path:'books', select:'title pages'}]
        }
        return query.exec(cb);
    };

    schema.statics.findUsers = function(options, cb) {

        var query = this.find(options.query);

        if (options.populateQuery) {
            query.populate(options.populateQuery) // [{path:'books', select:'title pages'}]
        }
        if (options.limt || 10) {
            query.limit(options.limit || 10);
        }
        if (options.skip || 0) {
            query.skip(options.skip || 0);
        }
        if (options.sort) {
            query.sort(options.sort);
        }
        return query.exec(cb);

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
