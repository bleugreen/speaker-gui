var express = require('express');
require('dotenv').config();
const axios = require('axios');

var sceneRoute = express.Router();
var client = require('../client.js');

const url = "https://localhost:3000"

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
        .zrange('scene:'+req.query.sid+":layers", 0, -1)
    .exec(
        function(err, replies){
            if(err){
                console.log(err)
            }
            else{
                if(replies[0]){
                    const scene = {
                        sid: sid,
                        ...replies[0],
                        layers: replies[1]
                    };
                    res.send(scene);
                }
                else{
                    res.send("Scene "+sid+" does not exist");
                }
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
sceneRoute.delete('/', (req,res) => {
    const sid = req.body.sid;
    console.log('delete sid:'+sid);
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
            if(!err){
                // delete hash of each layer
                replies[0].map(lid => {
                    client.del("layer:"+lid);
                })
                res.send(replies);
            }
            else{
                res.send(err)
            }
        }
    )
});

// duplicate scene
sceneRoute.get('/duplicate', (req,res)=> {
    var fullUrl = req.protocol + '://' + req.get('host')
    client.multi()
    .incr('scene:idgen')
    .hgetall("scene:"+req.query.sid)
    .zrange('scene:'+req.query.sid+":layers", 0, -1)
    .exec(function(err, replies){
        if(!err){
            const sid = replies[0].toString();
            const scene = replies[1];
            const layerlist = replies[2];
            let multi = client.multi();
            multi.sadd("scene:list", sid)
            for(const prop in scene){
                multi.hset('scene:'+sid, prop, scene[prop])
            }
            multi.exec();
            for(i in layerlist){
                axios.get(fullUrl+'/api/layer/duplicate', {params: {lid:layerlist[i]}})
                .then((response)=>{
                    const newLid = response.data.toString();
                    client.zadd('scene:'+sid+':layers', 0, newLid);
                })
                .catch( (response) => {console.log(response)});
            }
            console.log(layerlist);
            res.send(sid.toString())
        }
    });
});


// get name
sceneRoute.get('/name', (req,res) => {
    console.log("GET: scene name");
    client.hget('scene:'+req.query.sid, 'name', function(err, reply){
        res.send(reply);
    });
});

// get tags
sceneRoute.get('/tags', (req,res) => {
    console.log("GET: saved tags");
    client.smembers('scene:tags', function(err, reply){
        !err && res.send(reply.toString());
    });
});

// add tag
sceneRoute.post('/tags', (req,res)=> {
    //console.log(req.body);
    client.sadd('scene:tags', req.body.tag, function(err,reply) {
        !err && res.send(reply.toString());
    });
});

// remove tag
sceneRoute.delete('/tags', (req,res)=> {
    //console.log(req.body);
    client.srem('scene:tags', req.body.tag, function(err,reply) {
        !err && res.send(reply.toString());
    });
});

// get field
sceneRoute.get('/field', (req,res) => {
    console.log("GET: scene "+req.query.field+", sid: "+req.query.sid);
    client.hget('scene:'+req.query.sid, req.query.field, function(err, reply){
        res.send(reply.toString());
    });
});

// set field
sceneRoute.post('/field', (req,res)=> {
    //console.log(req.body);
    client.hset('scene:'+req.body.sid, req.body.field, req.body.value, function(err,reply) {
        !err && res.send(reply.toString());
    });
});

/* - - - - - - - - - - - - - - - - 
    Layer List
- - - - - - - - - - - - - - - - */
// get layers
sceneRoute.get('/layers', (req,res) => {
    console.log("GET: scene layers");
    client.zrange('scene:'+req.query.sid+":layers", 0, -1, function(err, reply){
        res.send(reply.toString());
    });
});

// add layer
sceneRoute.post('/layer', (req,res) => {
    const sid = req.body.sid;
    const index = req.body.index;
    const lid = req.body.lid;
    client.multi()
    .zadd('scene:'+sid+":layers", index, lid)
    .publish('notify', sid+lid+':new:null:null')
    .exec(
        function(err, replies){
            res.send(replies);
        }
    )
});

// remove layer
sceneRoute.delete('/layer', (req,res) => {
    const sid = req.body.sid;
    const lid = req.body.lid;
    client.multi()
    .zrem('scene:'+sid+":layers", lid)
    .publish('notify', sid+lid+':delete:null:null')
    .exec(
        function(err, replies){
            res.send(replies);
        }
    );
});

// reorder layers
sceneRoute.post('/reorder', (req,res) => {
    const sid = req.body.sid;
    const list = req.body.layers;
    const multi = client.multi();
    for (const [index, value] of list.entries()) {
       multi.zadd("scene:"+sid+":layers", index, value);
       multi.hset("layer:"+value, "index", index);
       multi.publish("notify", sid+":"+value+":update:index:"+index);
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
        !err && res.send(reply.toString());
    });
});

// get list of scenes
sceneRoute.get('/list', (req,res) => {
    client.smembers('scene:list', function(err, reply){
        !err && res.send(reply.toString());
    });
});

// get active scene
sceneRoute.get('/active', (req,res) => {
    client.get('scene:active', function(err, reply){
        !err && res.send(reply.toString());
    });
});

// set active scene
sceneRoute.post('/active', (req,res)=> {
    //console.log(req.body);
    client.set("scene:active", req.body.sid, function(err,reply) {
        client.publish("notify", req.body.sid+":null:changescene:null:null");
        !err && res.send(reply.toString());
    });
});

module.exports = sceneRoute;