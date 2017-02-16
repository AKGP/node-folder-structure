var mqtt = require('mqtt');

//var masterClient = mqtt.connect('mqtt://localhost:1883');

exports.client = function(topic) {
    //console.log(" topic is ",topic);
    return client = mqtt.connect('mqtt://localhost:1883');
    //console.log("working");
    // return client = mqtt.connect('mqtt://innoride.mod.bz:1883');
    // client.subscribe(topic, function() {
    //      console.log("client is subscribed to : ", topic)
    //  });
    //   return client;
};

//exports.masterClient = masterClient;
