const express = require('express');
require('dotenv').config();

var colorRoute = express.Router();
var client = require('../client.js');

/* - - - - - - - - - - - - - - - - 
    Saved Palette ( string list @ palette:{name} )

    Layer Palette ( string list @ layer:{lid}:palette )

- - - - - - - - - - - - - - - - */

/*

/* - - - - - - - - - - - - - - - - 
    Object ops
- - - - - - - - - - - - - - - - */

// save layer palette to list
//      body: name, colors
colorRoute.post('/save', (req,res) => {
    client.multi()
        .set('palette:'+req.body.name, req.body.colors)
        .sadd('palette:list', req.body.name)
    .exec(
        function(err,reply){
            res.send(req.body.name+' saved');
        }
    );
});

// get palette
//      query: name
colorRoute.get('/', (req,res) => {
    console.log("GET: "+req.query.name);
    client.get("palette:"+req.query.name, 
        function(err, reply){
            // create palette from replies (if not null)
            res.send(reply);
        }
    );
});

// set palette
//      body: name, colors (as concat string)
colorRoute.post('/', (req,res) => {
    console.log("SET: "+req.body.name+" - "+req.body.colors);
    client.set("palette:"+req.body.name, req.body.colors,
        function(err, reply){
            // create palette from replies (if not null)
            res.send(reply.toString());
        }
    );
});

// delete palette
//      query: name
colorRoute.delete('/', (req,res) => {
    console.log("DELETE: palette:"+req.query.name);
    client.multi()
        // delete hash fields
        .del("palette:"+req.query.name)
        // remove from palette list
        .srem('palette:list', req.query.name)
    .exec(
        function(err, replies){
            res.send(replies);
        }
    );
});

// get all saved palettes
colorRoute.get('/list', (req,res) => {
    console.log("GET: palette list");
    client.smembers("palette:list", 
        function(err, reply){
            const list = []
            for (let i = 0; i < reply.length; i++) {
                const name = reply[i]
                console.log("searching "+name);
                client.get("palette:"+name, 
                    function(err, reply2){
                        if(reply2){
                            const palette = {
                                name: name,
                                colors: reply2.toString()
                            };
                            list.push(palette);
                            if(i == reply.length-1){
                                res.send(list);
                            }
                        }
                        else{
                            console.log("Palette "+name+" does not exist");
                        }
                    }
                );
                
            }
        }
    );
});