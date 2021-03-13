var express = require('express');
//require('dotenv').config();


var modeRoute = express.Router();
var redis = require('redis');
var client = redis.createClient({
host: process.env.REDIS_HOST,
port: process.env.REDIS_PORT, 
password: process.env.REDIS_PW
}); //creates a new client


client.on('connect', function() {
    console.log('Connection Success: mode');
});

//log error to the console if any occurs
client.on("error", (err) => {
    console.log(err);
});

modeRoute.get('/all', (req,res) => {
console.log("GET: mode list");
client.smembers('modelist', function(err, reply){
    res.send(reply);
});
});

modeRoute.get('/curr', (req,res) => {
console.log("GET: current mode");
client.get('currmode', function(err, reply){
    //console.log(reply)
    res.send(reply);
});
});

modeRoute.get('/', (req,res) => {
console.log("GET: "+req.query.hash+"."+req.query.key);
client.hget(req.query.hash, req.query.key, function(err, reply){
    //console.log(reply)
    res.send(reply);
});
});

modeRoute.post('/', (req,res)=> {
//console.log(req.body);
client.hmset(req.body.hash, req.body.key, req.body.value, function(err,reply) {
    //console.log(reply)
    res.sendStatus(reply);
});
});

module.exports = modeRoute;