
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


var app = express();
var redis = require('redis');
var client = redis.createClient(6379, "speakerpi.local"); //creates a new client

client.on('connect', function() {
    console.log('connected');
});

//log error to the console if any occurs
client.on("error", (err) => {
    console.log(err);
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

app.get('/mode', (req,res) => {
  console.log("GET: "+req.query.hash+"."+req.query.key);
  client.hget(req.query.hash, req.query.key, function(err, reply){
    res.send(reply);
  });
});

app.post('/mode', (req,res)=> {
  client.hmset(req.body.hash, req.body.key, req.body.value, function(err,reply) {
    console.log("POST: "+req.body.hash+"."+req.body.key+" = "+req.body.value);
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
