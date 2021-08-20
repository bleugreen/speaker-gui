var express = require('express');
require('dotenv').config();


var utilRoute = express.Router();
var client = require('../client.js');
var sub = require('../subscriber.js');

/* - - - - - - - - - - - - - - - - 
    System
- - - - - - - - - - - - - - - - */

// get connected
utilRoute.get('/connected', (req,res) => {
    client.get('connected', function(err, reply){
        res.send(reply);
    });
});

// reboot
utilRoute.post('/reboot', (req,res)=> {
    //console.log(req.body);
    client.publish("util", "reboot", function(err,reply) {
        //console.log(reply)
        res.send(reply.toString());
    });
});

// shutdown
utilRoute.post('/shutdown', (req,res)=> {
    //console.log(req.body);
    client.publish("util", "shutdown", function(err,reply) {
        //console.log(reply)
        res.send(reply.toString());
    });
});

// get layout
utilRoute.get('/layout', (req,res) => {
    client.get('layout', function(err, reply){
        res.send(reply);
    });
});

// set layout
utilRoute.post('/layout', (req,res)=> {
    //console.log(req.body);
    client.set("layout", req.body.layout, function(err,reply) {
        //console.log(reply)
        res.send(reply.toString());
    });
});

/* - - - - - - - - - - - - - - - - 
    Lights
- - - - - - - - - - - - - - - - */

// get running
utilRoute.get('/running', (req,res) => {
    client.get('running', function(err, reply){
        res.send(reply);
    });
});

// start
utilRoute.post('/start', (req,res)=> {
    //console.log(req.body);
    client.publish("util", "start", function(err,reply) {
        //console.log(reply)
        res.send(reply.toString());
    });
});

// end
utilRoute.post('/end', (req,res)=> {
    //console.log(req.body);
    client.publish("notify", "END", function(err,reply) {
        //console.log(reply)
        res.send(reply.toString());
    });
});

let messages = [];
const addMessage = (msg) => {
    messages.push(msg);
}
sub.on("message", function (channel, message) {
    addMessage(message);
    console.log("Incoming: "+message);
});

// stream
utilRoute.get("/stream", (req, res) => {
    res.set({
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
  
      // enabling CORS
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    });
    res.setHeader('Access-Control-Allow-Origin', '*');

    let eventInterval = setInterval(() => {
        while(messages.length > 0){
            res.write(`data: ${messages.pop()}\n\n`);
        }
    }, 500);

    req.on('close', (err) => {
        clearInterval(eventInterval);
        res.end();
        })
  })
  

module.exports = utilRoute;