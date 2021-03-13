var express = require('express');
//require('dotenv').config();


var modeRoute = express.Router();
var client = require('../client.js');




modeRoute.get('/list', (req,res) => {
    console.log("GET: mode list");
    client.smembers('mode:list', function(err, reply){
        res.send(reply);
    });
});

modeRoute.get('/idgen', (req,res) => {
    console.log("GET: mode id");
    client.incr('mode:idgen', function(err, reply){
        res.send(reply.toString());
    });
});

modeRoute.get('/active', (req,res) => {
console.log("GET: current mode");
    client.get('mode:active', function(err, reply){
        //console.log(reply)
        res.send(reply);
    });
});

modeRoute.get('/', (req,res) => {
    console.log("GET: "+req.query.id);
    client.hgetall("mode:"+req.query.id, function(err, reply){
        //console.log(reply)
        res.send(reply);
    });
});

modeRoute.post('/update', (req,res)=> {
    //console.log(req.body);
    client.hmset("mode:"+req.body.id, req.body.field, req.body.value, function(err,reply) {
        //console.log(reply)
        res.sendStatus(reply);
    });
});

module.exports = modeRoute;