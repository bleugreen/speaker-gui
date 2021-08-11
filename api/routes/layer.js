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
            "pos", "left,right,center",
            "layout", "left,right",
            "tile", "repeat",
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
                    "pattern", "lingradient",
                    "direction", 'down'
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
    client.multi()
    .del("layer:"+req.body.lid)
    .exec(
        function(err,replies){
            res.send(req.body.lid.toString());
        }
    )
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
            message = "layer:"+req.body.lid+":action:update:field:"+req.body.field+":value:"+req.body.value;
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
    message = "layer:"+req.body.lid+":action:update:field:"+req.body.field+":value:"+req.body.value;
    client.publish("active", message);
    res.send('sent');
    
});

module.exports = layerRoute;