const express = require('express');
require('dotenv').config();

var layerRoute = express.Router();
var client = require('../client.js');

/* - - - - - - - - - - - - - - - - 
    Object ops
- - - - - - - - - - - - - - - - */
// create
layerRoute.post('/new', (req,res) => {
    // get new pid
    client.incr('layer:idgen', function(err, reply){
        const lid = reply;
        console.log("IDGEN: "+reply);
        let newLayer = [
            "name", req.body.name, 
            "type", req.body.type,
            "opacity", 100,
            "pos", "left",
            "layout", "both",
            "pid", 0
        ];
        switch(req.body.type){
            case "single":
                newLayer.push(
                    "source", "rms",
                    "pattern", "hit"
                );
                break;
            case "spectrum":
                newLayer.push(
                    "source", "bark",
                    "pattern", "bars"
                );
                break;
            case "ambient":
                newLayer.push(
                    "source", "none",
                    "pattern", "gradient"
                );
                break;
        }
        
        client.multi()
            .hmset("layer:"+lid, newLayer)
            .sadd('scene:'+req.body.sid+':layers', 0, lid)
        .exec(
            function(err,replies){
                res.send(lid.toString());
            }
        );
    });
});

// get
layerRoute.get('/', (req,res) => {
    client.hgetall("layer:"+req.query.lid, 
        function(err, reply){
            res.send(reply);
        }
    );
});

// delete
layerRoute.delete('/', (req,res) => {
    client.del("layer:"+req.body.lid, 
        function(err, reply){
            res.send(reply.toString());
        }
    );
});


/* - - - - - - - - - - - - - - - - 
    Field ops
- - - - - - - - - - - - - - - - */
// get (field)
layerRoute.get('/field', (req,res) => {
    console.log("GET: "+req.query.field+" of "+req.query.lid);
    client.hget("layer:"+req.query.lid, req.query.field, 
        function(err, reply){
            res.send(reply);
        }
    );
});

// set field
layerRoute.post('/field', (req,res) => {
    console.log("SET: "+req.body.field+" of "+req.body.lid+" to "+req.body.value); 
    client.hset("layer:"+req.body.lid, 
        req.body.field, req.body.value,
        function(err, reply){
            message = "update:"+req.body.lid+":"+req.body.field+":"+req.body.value;
            client.publish("active", message);
            res.send(reply.toString());
        }
    );
});



// get name
layerRoute.get('/name', (req,res) => {
    console.log("GET: name of "+req.query.lid);
    client.hget("layer:"+req.query.lid, "name", 
        function(err, reply){
            res.send(reply);
        }
    );
});

// set name
layerRoute.post('/name', (req,res) => {
    console.log("SET: name of "+req.body.lid+" to "+req.body.name); 
    client.hset("layer:"+req.body.lid, 
        "name", req.body.name,
        function(err, reply){
            res.send(reply.toString());
        }
    );
});

// get type
layerRoute.get('/type', (req,res) => {
    console.log("GET: type of "+req.query.lid);
    client.hget("layer:"+req.query.lid, "type", 
        function(err, reply){
            res.send(reply);
        }
    );
});

// get opacity
layerRoute.get('/opacity', (req,res) => {
    console.log("GET: opacity of "+req.query.lid);
    client.hget("layer:"+req.query.lid, "opacity", 
        function(err, reply){
            res.send(reply);
        }
    );
});

// set opacity
layerRoute.post('/opacity', (req,res) => {
    console.log("SET: opacity of "+req.body.lid+" to "+req.body.opacity); 
    client.hset("layer:"+req.body.lid, 
        "opacity", req.body.opacity,
        function(err, reply){
            res.send(reply.toString());
        }
    );
    message = "update:"+req.body.lid+":opacity:"+req.body.opacity;
    client.publish("active", message);
});

// get position
layerRoute.get('/pos', (req,res) => {
    console.log("GET: pos of "+req.query.lid);
    client.hget("layer:"+req.query.lid, "pos", 
        function(err, reply){
            res.send(reply);
        }
    );
});

// set position
layerRoute.post('/pos', (req,res) => {
    console.log("SET: pos of "+req.body.lid+" to "+req.body.pos); 
    client.hset("layer:"+req.body.lid, 
        "pos", req.body.pos,
        function(err, reply){
            message = "update:"+req.body.lid+":pos:"+req.body.pos;
            client.publish("active", message);
            res.send(reply.toString());
        }
    );
});

// get pid
layerRoute.get('/pid', (req,res) => {
    console.log("GET: pid of "+req.query.lid);
    client.hget("layer:"+req.query.lid, "pid", 
        function(err, reply){
            res.send(reply);
        }
    );
});

// set pid
layerRoute.post('/pid', (req,res) => {
    console.log("SET: pid of "+req.body.lid+" to "+req.body.pid); 
    client.hset("layer:"+req.body.lid, 
        "pid", req.body.pid,
        function(err, reply){
            res.send(reply.toString());
        }
    );
    message = "update:"+req.body.lid+":pid:"+req.body.pid;
    client.publish("active", message);
});

// get layout
layerRoute.get('/layout', (req,res) => {
    console.log("GET: layout of "+req.query.lid);
    client.hget("layer:"+req.query.lid, "layout", 
        function(err, reply){
            res.send(reply);
        }
    );
});

// set layout
layerRoute.post('/layout', (req,res) => {
    console.log("SET: layout of "+req.body.lid+" to "+req.body.layout); 
    client.hset("layer:"+req.body.lid, 
        "layout", req.body.layout,
        function(err, reply){
            message = "update:"+req.body.lid+":layout:"+req.body.layout;
            client.publish("active", message);
            res.send(reply.toString());
        }
    );
});

/* - - - - - - - - - - - - - - - - 
    Global ops
- - - - - - - - - - - - - - - - */

//notify
layerRoute.post('/notify', (req,res) => {
    console.log("MSG: lid:"+req.body.lid+" and "+req.body.field+": "+req.body.value); 
    message = "update:"+req.body.lid+":"+req.body.field+":"+req.body.value;
    client.publish("active", message);
    res.send('sent');
    
});

module.exports = layerRoute;