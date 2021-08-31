
var redis = require('redis');
var client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT, 
    password: process.env.REDIS_PW,
    max_attempts: true
}); //creates a new client

client.on('connect', function() {
    console.log('Connection Success: mode');
});

//log error to the console if any occurs
client.on("error", (err) => {
    console.log(err);
});

module.exports = client;