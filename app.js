
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , favicon = require('serve-favicon')
  , logger = require('morgan')
  , methodOverride = require('method-override');

  require('dotenv').config();
var app = express();
var redis = require('redis');
var client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT, 
  password: process.env.REDIS_PW
}); //creates a new client

client.on('connect', function() {
    console.log('Connection Success');
});

//log error to the console if any occurs
client.on("error", (err) => {
    console.log(err);
});

//log error to the console if any occurs
client.on("end", (res) => {
  console.log(res);
});

//log error to the console if any occurs
client.on("reconnecting", (res) => {
  console.log(res);
});

app.set('port', process.env.PORT || 3000);
app.use(favicon(__dirname + '/public/images/favicon.png'));
app.use(logger('dev'));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'client/build')));

if (app.get('env') == 'development') {
  app.locals.pretty = true;
}

app.get('/mode/all', (req,res) => {
  console.log("GET: mode list");
  client.smembers('modelist', function(err, reply){
    res.send(reply);
  });
});

app.get('/mode/curr', (req,res) => {
  console.log("GET: current mode");
  client.get('currmode', function(err, reply){
    console.log(reply)
    res.send(reply);
  });
});

app.get('/palette/exists', (req,res) => {
  console.log("EXISTS: "+req.query.key);
  client.hlen('palette-'+req.query.key, function(err, reply){
    if(reply == 0){
      // doesnt exist
      res.send('false');
    }
    else{
      res.send({
        r: 5,
        g:6,
        b: 7,
      });
    }
  });
});

app.get('/palette/get', (req,res) => {
  console.log("GET: palette:"+req.query.key);
  client.hgetall("palette-"+req.query.key, function(err, reply){
    console.log(reply);
    res.send(reply);
  });
});

app.post('/palette/saveall', (req,res) => {
  console.log(req);
  // console.log("SETALL: palette: "+req.body.id
  // +" - 1:"+req.body.r1+","+req.body.g1+","+req.body.b1
  // +" - 2:"+req.body.r2+","+req.body.g2+","+req.body.b2
  // +" - 3:"+req.body.r3+","+req.body.g3+","+req.body.b3
  // );
  client.hmset("palette-"+req.body.id, 
  "r1", req.body.r1, "g1", req.body.g1, "b1", req.body.b1,
  "r2", req.body.r2, "g2", req.body.g2, "b2", req.body.b2,
  "r3", req.body.r3, "g3", req.body.g3, "b3", req.body.b3,
  function(err, reply){
    console.log(reply);
    res.send(reply);
  });
  client.sadd('palettes', req.body.id, function(err, reply){
    console.log(reply);
    res.send(reply);
  });
});

app.get('/mode', (req,res) => {
  console.log("GET: "+req.query.hash+"."+req.query.key);
  client.hget(req.query.hash, req.query.key, function(err, reply){
    console.log(reply)
    res.send(reply);
  });
});

app.post('/mode', (req,res)=> {
  console.log(req.body);
  client.hmset(req.body.hash, req.body.key, req.body.value, function(err,reply) {
    console.log(reply)
    res.sendStatus(reply);
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
