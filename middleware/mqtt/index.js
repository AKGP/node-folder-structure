var mosca = require('mosca');
var backjack = {
    type: 'mongo',
    // url: 'mongodb://localhost:27017/mqtt',
    url: 'mongodb://innofied:innofied@ds035543.mlab.com:35543/mqtt',
    pubsubCollection: 'mosca',
    mongo: {}
};

var moscaSettings = {

    port: 1883,
    http: {
        port: 3000,
        bundle: true,
        static: './'
    },
    backend: backjack
};




var server = new mosca.Server(moscaSettings);

server.on('clientConnected', function(client) {
    console.log("\x1b[34m", "new client connected : \x1b[0m", client.id);
});

server.on('published', function(packet, client) {
    //  console.log('published1 ',packet);
    console.log("\x1b[34m", 'published from server: \x1b[35m', packet.payload.toString("utf-8"), "\x1b[0m");
});

server.on('ready', setup);

function setup() {
    console.log('Mosca server running');
    //  console.log(server);
}
