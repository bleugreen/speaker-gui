var express = require('express');
require('dotenv').config();


var colorRoute = express.Router();
var client = require('../client.js');

colorRoute.get('/idgen', (req,res) => {
    console.log("GET: palette id");
    client.incr('palette:idgen', function(err, reply){
        res.send(reply.toString());
    });
});

// create/save palette
//  set (palette+name) name color1
//  sadd palettes (name)
colorRoute.post('/new', (req,res) => {
    client.rpush("palette-"+req.body.name, 
        req.body.name, 
        function(err, reply){
        //console.log('push name reply: '+reply);
    });
    client.rpush("palette-"+req.body.name, 
        req.body.colors,
        function(err, reply){
            //console.log('push color reply: '+reply);
            client.sadd('palettelist', req.body.name, function(err, reply){
                //console.log(reply);
            });
        res.send('success');
    });
});

// create/save palette
//  set (palette+name) name color1
//  sadd palettes (name)
colorRoute.post('/update', (req,res) => {
//console.log("UPDATE: palette-"+req.body.name+"="
//+" name:"+req.body.name
//+" colors:"+req.body.colors);
client.ltrim("palette-"+req.body.name, 0, 0, function(err, reply){
    console.log(reply);
    client.rpush("palette-"+req.body.name, 
    req.body.colors,
    function(err, reply){
        //console.log(reply);
        client.sadd('palettelist', req.body.name, function(err, reply){
        //console.log(reply);
        });
        res.send('success');
    });
});
});


// get palette
//  get (palette+name)
colorRoute.get('/', (req,res) => {
    //console.log("GET: palette:"+req.query.name);
    client.lrange("palette-"+req.query.name, 0, -1, function(err, reply){
        //console.log(reply);
        res.send(reply);
    });
});

// get palette length
//  get (palette+name)
colorRoute.get('/length', (req,res) => {
    //console.log("GET: length of palette:"+req.query.name);
    client.llen("palette-"+req.query.name, function(err, reply){
        //console.log({length: reply});
        res.send({length: reply});
    });
});

// push a color onto palette
colorRoute.post('/push', (req,res) => {
    //console.log("PUSH: palette-"+req.body.name+"="
    //+" color:"+req.body.color);
    client.rpush("palette-"+req.body.name, 
        req.body.color,
        function(err, reply){
        // console.log(reply);
            res.send('success');
        });
});

// delete last color
//  get (palette+name)
colorRoute.get('/pop', (req,res) => {
    //console.log("DEL: last color of palette:"+req.query.name);
    client.ltrim("palette-"+req.query.name, 0, -2, function(err, reply){
        //console.log({length: reply});
        res.send(reply);
    });
});

// delete palette
//  hdel (palette+id) name color1 color2 color3
//  srem palettes id
colorRoute.get('/del', (req,res) => {
    //console.log("DELETE: palette:"+req.queryname);
    client.ltrim("palette-"+req.query.name, -1, 0, function(err, reply){
        //console.log(reply);
        client.srem('palettelist', req.query.name, function(err, reply){
        //console.log(reply);
        res.send('deleted');
        });
    });
});

// get all palettes
//  smembers palettes
//    for each palette:
colorRoute.get('/list', (req,res) => {
    //console.log("GETALL: palettes");
    client.smembers("palettelist", function(err, reply){
        res.send(reply);
    });
});

colorRoute.get('/exists', (req,res) => {
    //console.log("EXISTS: palette:"+req.query);
    client.llen("palette-"+req.query.name, function(err, reply){
        if(reply == 0){
            res.send(false);
        }
        else{
            res.send(true);
        }
    });
});

module.exports = colorRoute;