'use strict';

var module, exports;
var cluster = require('cluster');

module.exports.startScaling = function(cb) {
    if (cluster.isMaster) {
        var numOfCpu = require('os').cpus().length;


        cluster.on('online', function(worker) {
            console.log('Worker ' + worker.process.pid + ' is online');
        });


        cluster.on('exit', function(worker, code, signal) {
            console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);

            cluster.fork();
        });
        for (var i = 0; i < numOfCpu; i++) {
            cluster.fork();
        }
    } else {
        cb();
    }
}
