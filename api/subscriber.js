var redis = require('redis');
var sub = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT, 
    password: process.env.REDIS_PW
}); //creates a new client

sub.on('connect', function() {
    console.log('Connection Success: subscriber');
});

//log error to the console if any occurs
sub.on("error", (err) => {
    console.log(err);
});

let changed = "false";
sub.on("message", function (channel, message) {
    changed = message;
});

sub.subscribe("pi2site");

module.exports = sub;