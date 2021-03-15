var express = require('express');
require('dotenv').config();


var activeRoute = express.Router();
var client = require('../client.js');


activeRoute.post('/', (req,res) => {
    client.set("mode:active", 
        req.body.id, 
        function(err, reply){
            console.log("ACTIVE CHANGE: "+req.body.id);
            client.publish("active", "switch:"+req.body.id);
            res.send(reply.data);
        }
    );
});

activeRoute.post('/update', (req,res) => {
    client.publish("active", 
        "update:"+req.body.field+":"+req.body.value,
        function(err, reply){
            console.log("ACTIVE UPDATE: "+req.body.id);
            res.send("received: "+reply);
        }
    );
});

// get active id
activeRoute.get('/', (req,res) => {
    client.get("mode:active", function(err, reply){
        console.log("ACTIVE: "+reply);
        res.send(reply);
    });
});



module.exports = activeRoute;