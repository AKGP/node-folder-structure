'use strict';
module.exports = function(schema) {


    schema.statics.findElemant = function(options, cb) {
        console.log('options ', options);
        var query = this.findOne(options.query);

        if (options.populateQuery) {
            query.populate(options.populateQuery) // [{path:'books', select:'title pages'}]
        }
        return query.exec(cb);
    };

    schema.statics.addValue = function(options, cb) {
        var newEntry = new this();
        Object.keys(options).forEach(function(key) {
            newEntry[key] = options[key];
        });
        return newEntry.save(cb);
    }

    return schema;

};
