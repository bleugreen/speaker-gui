var express = require('express');
require('dotenv').config();


var sceneRoute = express.Router();
var client = require('../client.js');

/* - - - - - - - - - - - - - - - - 
    Scene
        scene:{sid}:
            name
        scene:{sid}:layers
            sorted set of layers

- - - - - - - - - - - - - - - - */
// get scene
// returns:
//  name (string)
//  layers (name of list)
sceneRoute.get('/', (req,res) => {
    const sid = req.query.sid;
    console.log("GET: "+sid);
    client.multi()
        .hgetall("scene:"+sid)
        .zrange("scene:"+sid+":layers", 0, -1)
    .exec(
        function(err, replies){
            if(replies[0]){
                const scene = {
                    sid: sid,
                    name: replies[0].name,
                    layers: replies[1]
                };
                res.send(scene);
            }
            else{
                res.send("Scene "+sid+" does not exist");
            }
        }
    );
});

// create scene
sceneRoute.post('/new', (req,res) => {
    // get unique id
    client.incr('scene:idgen', function(err, reply){
        let sid = reply;
        console.log("SCENE IDGEN: "+reply);
        client.multi()
            // create scene hash
            .hset("scene:"+sid, "name", req.body.name)
            // add to scene list
            .sadd("scene:list", sid)
        .exec(
            function(err, replies){
                res.send(sid.toString());
            }
        );
    });
});

// delete scene
sceneRoute.delete('/del', (req,res) => {
    const sid = req.query.sid;
    client.multi()
        // get lids assoc. with scene
        .zrange("scene:"+sid+":layers", 0, -1)
        // delete scene hash
        .del("scene:"+sid)
        // delete layer list
        .del("scene:"+sid+":layers")
        // remove from scene list
        .srem("scene:list", sid)
    .exec(
        function(err, replies){
            // delete hash of each layer
            replies[0].map(lid => {
                client.del("layer:"+lid);
            })
            res.send(replies);
        }
    )
});

/* - - - - - - - - - - - - - - - - 
    Layer List
- - - - - - - - - - - - - - - - */
// get layers
sceneRoute.get('/layers', (req,res) => {
    console.log("GET: scene layers");
    client.zrange('scene:'+req.query.sid+":layers", 0, -1, function(err, reply){
        res.send(reply);
    });
});

// add layer
sceneRoute.post('/layer', (req,res) => {
    const sid = req.body.sid;
    const index = req.body.index;
    const lid = req.body.lid;
    client.zadd('scene:'+sid+":layers", index, lid, function(err, reply){
        res.send(reply.toString());
    });
});

// remove layer
sceneRoute.delete('/layer', (req,res) => {
    const sid = req.body.sid;
    const lid = req.body.lid;
    client.zrem('scene:'+sid+":layers", lid, function(err, reply){
        res.send(reply.toString());
    });
});

// reorder layers
sceneRoute.post('/reorder', (req,res) => {
    const sid = req.body.sid;
    const list = req.body.layers;
    const multi = client.multi();
    for (const [index, value] of list.entries()) {
       multi.zadd("scene:"+sid+":layers", index, value)
    }
    multi.exec(function(err, replies) {
        res.send(replies);
    });
});

/* - - - - - - - - - - - - - - - - 
    Global
- - - - - - - - - - - - - - - - */
// get new id
sceneRoute.get('/idgen', (req,res) => {
    console.log("GET: scene id");
    client.incr('scene:idgen', function(err, reply){
        res.send(reply.toString());
    });
});

// get list of scenes
sceneRoute.get('/list', (req,res) => {
    client.smembers('scene:list', function(err, reply){
        res.send(reply);
    });
});

// get active scene
sceneRoute.get('/active', (req,res) => {
    client.get('scene:active', function(err, reply){
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

module.exports = sceneRoute;