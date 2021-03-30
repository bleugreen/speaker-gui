var express = require('express');
require('dotenv').config();


var sceneRoute = express.Router();
var client = require('../client.js');



// global

// get new id
sceneRoute.get('/idgen', (req,res) => {
    console.log("GET: scene id");
    client.incr('scene:idgen', function(err, reply){
        res.send(reply.toString());
    });
});

// get list of scenes
sceneRoute.get('/list', (req,res) => {
    console.log("GET: scene list");
    client.smembers('scene:list', function(err, reply){
        res.send(reply);
    });
});

// get active scene
sceneRoute.get('/active', (req,res) => {
console.log("GET: current scene");
    client.get('scene:active', function(err, reply){
        //console.log(reply)
        res.send(reply);
    });
});

// set active scene
sceneRoute.post('/active', (req,res)=> {
    //console.log(req.body);
    client.hmset("scene:active", req.body.id, function(err,reply) {
        //console.log(reply)
        res.sendStatus(reply);
    });
});


//single

// get scene
// returns:
//  name (string)
//  layers (name of list)
sceneRoute.get('/', (req,res) => {
    console.log("GET: "+req.query.id);
    client.hgetall("scene:"+req.query.id, function(err, reply){
        //console.log(reply)
        res.send(reply);
    });
});

// create scene
sceneRoute.post('/new', (req,res) => {
    // get unique id
    client.incr('scene:idgen', function(err, reply){
        let sid = reply;
        console.log("SCENE IDGEN: "+reply);
        client.rpush("scene:"+sid, 
        req.body.name,
        function(err, reply){
            client.sadd('scene:list', sid, function(err, reply){
                //console.log(reply);
            });
        });
        res.send(sid.toString());
    });
});

// delete scene
sceneRoute.get('/del', (req,res) => {
    // get layer list
    // delete each layer
    // clear layer list
    // hdel name, ...



    console.log("DELETE: scene:"+req.query.sid);
    client.ltrim("palette:"+req.query.pid, -1, 0, function(err, reply){
        //console.log(reply);
        client.srem('palette:list', req.query.pid, function(err, reply){
        //console.log(reply);
        res.send('deleted');
        });
    });
});

//update scene
sceneRoute.post('/update', (req,res)=> {
    //console.log(req.body);
    client.hmset("scene:"+req.body.id, req.body.field, req.body.value, function(err,reply) {
        //console.log(reply)
        res.sendStatus(reply);
    });
});

// get layers
//  returns:
//      [ all layer ids ] 
sceneRoute.get('/layers', (req,res) => {
    console.log("GET: "+req.query.id);
    client.lrange("scene:"+req.query.id+":layers", 0, -1, function(err, reply){
        //console.log(reply)
        res.send(reply);
    });
});



module.exports = sceneRoute;