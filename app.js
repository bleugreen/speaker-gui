
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


// create/save palette
//  set (palette+name) name color1
//  sadd palettes (name)
app.post('/palette', (req,res) => {
  console.log("SET: palette: "+req.body.name+"="
  +" name:"+req.body.name
  +" color1:"+req.body.color1
  +" color2:"+req.body.color2
  +" color3:"+req.body.color3);
  client.hmset("palette-"+req.body.name, 
    "name", req.body.name, 
    "color1", req.body.color1,
    "color2", req.body.color2,
    "color3", req.body.color3,
    function(err, reply){
      console.log(reply);
      client.sadd('palettes', req.body.name, function(err, reply){
        console.log(reply);
      });
      res.send(reply);
  });
  
});

// get palette
//  get (palette+name)
app.get('/palette', (req,res) => {
  console.log("GET: palette:"+req.query.name);
  client.hgetall("palette-"+req.query.name, function(err, reply){
    //console.log(reply);
    res.send(reply);
  });
});

// delete palette
//  hdel (palette+id) name color1 color2 color3
//  srem palettes id
app.get('/palette/del', (req,res) => {
  console.log("DELETE: palette:"+req.query);
  client.hdel("palette-"+req.query.name, 'name', 'color1', 'color2', 'color3', function(err, reply){
    console.log(reply);
    client.srem('palettes', req.query.name, function(err, reply){
      console.log(reply);
      res.send('deleted');
    });
  });
});

// get all palettes
//  smembers palettes
//    for each palette:
app.get('/palette/list', (req,res) => {
  console.log("GETALL: palettes");
  client.smembers("palettes", function(err, reply){
    res.send(reply);
  });
});

app.get('/palette-exists', (req,res) => {
  console.log("EXISTS: palette:"+req.query);
  client.hlen("palette-"+req.query.name, function(err, reply){
    if(reply == 0){
      res.send(false);
    }
    else{
      res.send(true);
    }
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
