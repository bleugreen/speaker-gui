const express = require('express');
require('dotenv').config();

var colorRoute = express.Router();
var client = require('../client.js');

/* - - - - - - - - - - - - - - - - 
    Saved Palette ( string list @ palette:{name} )

    Layer Palette ( string list @ layer:{lid}:palette )

- - - - - - - - - - - - - - - - */

/*
--- Redis reference ---

Stacking commands:
    client.multi()
        .command()
        .command()
        ...
    .exec(
        function(err, replies){
            // do stuff
        }
    );

Get whole list
    .lrange(list, 0, -1)

Delete whole list
    .ltrim(list, -1, 0)
*/



/* - - - - - - - - - - - - - - - - 
    Object ops
- - - - - - - - - - - - - - - - */

// create new
colorRoute.post('/new', (req,res) => {
    // get new pid
    client.incr('palette:idgen', function(err, reply){
        const pid = reply;
        console.log("IDGEN: "+reply);
        client.multi()
            .hmset("palette:"+pid, 
                "name", req.body.name, 
                "locked", false,
                "lerp", true
            )
            .rpush("palette:"+pid+":colors", req.body.colors)
            .sadd('palette:list', pid)
        .exec(
            function(err,replies){
                res.send(pid.toString());
            }
        );
    });
});

// get whole
colorRoute.get('/', (req,res) => {
    console.log("GET: palette:"+req.query.pid);
    client.multi()
        // get hash data
        .hgetall("palette:"+req.query.pid)
        // get color list
        .lrange("palette:"+req.query.pid+":colors", 0, -1)
    .exec(
        function(err, replies){
            // create palette from replies (if not null)
            if(replies[0]){
                const palette = {
                    pid: req.query.pid,
                    name: replies[0].name,
                    locked: replies[0].locked,
                    lerp: replies[0].lerp,
                    colors: replies[1]
                };
                res.send(palette);
            }
            else{
                res.send("Palette "+req.query.pid+" does not exist");
            }
        }
    );
});

// delete whole
colorRoute.delete('/', (req,res) => {
    const pid = req.body.pid
    console.log("DELETE: palette:"+pid);
    client.multi()
        // clear out color list
        .ltrim("palette:"+pid+":colors", -1, 0)
        // delete hash fields
        .hdel("palette:"+pid, "name", "locked", "lerp")
        // remove from palette list
        .srem('palette:list', req.query.pid)
    .exec(
        function(err, replies){
            res.send(replies);
        }
    );
});

/* - - - - - - - - - - - - - - - - 
    Name
- - - - - - - - - - - - - - - - */

// get name
colorRoute.get('/name', (req,res) => {
    console.log("GET: name of "+req.query.pid);
    client.hget("palette:"+req.query.pid, "name", 
        function(err, reply){
            res.send(reply);
        }
    );
});

/* - - - - - - - - - - - - - - - - 
    Lerp
- - - - - - - - - - - - - - - - */

// get lerp
colorRoute.get('/lerp', (req,res) => {
    console.log("GET: lerp of "+req.query.pid);
    client.hget("palette:"+req.query.pid, "lerp", 
        function(err, reply){
            res.send(reply);
        }
    );
});

// set lerp
colorRoute.post('/lerp', (req,res) => {
    console.log("SET: lerp of "+req.body.pid+" to "+req.body.lerp); 
    client.hset("palette:"+req.body.pid, 
        "lerp", req.body.lerp,
        function(err, reply){
            res.send(reply.toString());
        }
    );
});

/* - - - - - - - - - - - - - - - - 
    Locked
- - - - - - - - - - - - - - - - */

// get locked
colorRoute.get('/locked', (req,res) => {
    console.log("GET: locked of "+req.query.pid);
    client.hget("palette:"+req.query.pid, "locked", 
        function(err, reply){
            res.send(reply);
        }
    );
});

// set locked
colorRoute.post('/locked', (req,res) => {
    console.log("SET: locked of "+req.body.pid+" to "+req.body.locked); 
    client.hset("palette:"+req.body.pid, 
        "locked", req.body.locked,
        function(err, reply){
            res.send(reply.toString());
        }
    );
});

/* - - - - - - - - - - - - - - - - 
    Colors
- - - - - - - - - - - - - - - - */

// get colors
colorRoute.get('/colors', (req,res) => {
    console.log("GET: colors of "+req.query.pid);
    client.lrange("palette:"+req.query.pid+":colors", 0, -1,
        function(err, reply){
            res.send(reply);
        }
    );
});

// set colors
colorRoute.post('/colors', (req,res) => {
    console.log(req.body);
    if(req.body.pid > 0){
        const hash = "palette:"+req.body.pid+":colors";
        const colors = req.body.colors;
        console.log("SET: colors of "+hash+" to "+colors); 
        client.multi()
            // clear list
           .ltrim(hash, -1, 0)
            // push new list
            .rpush(hash, colors)
        .exec(
            function(err, replies){
                res.send(replies[1].toString());
            }
        );
    }
    else{
        res.send("Error - pid or colors undefined");
    }
});

// push color
colorRoute.post('/push', (req,res) => {
    console.log("PUSH: palette:"+req.body.pid+" - color:"+req.body.color);
    client.rpush("palette:"+req.body.pid+":colors", 
        req.body.color,
        function(err, reply){
            res.send(reply.toString());
        }
    );
});

// pop color
colorRoute.delete('/pop', (req,res) => {
    console.log("POP: palette:"+req.query.pid);
    client.rpop("palette:"+req.query.pid+":colors", function(err, reply){
        if(err){
            console.log(err);
        }
        else{
            res.send(reply.toString());
        }
        
    });
});

// update color
colorRoute.post('/update', (req,res) => {
    console.log("UPDATE: "+req.body.pid+" index="+req.body.index+" color="+req.body.color);
    client.lset("palette:"+req.body.pid+":colors", 
        req.body.index, req.body.color,
        function(err, reply){
            res.send(reply.toString());
        }
    );
});

/* - - - - - - - - - - - - - - - - 
    Global ops
- - - - - - - - - - - - - - - - */

// get new pid
// colorRoute.get('/idgen', (req,res) => {
//     console.log("GET: new pid");
//     client.incr('palette:idgen', function(err, reply){
//         res.send(reply.toString());
//     });
// });

// get all palettes
colorRoute.get('/list', (req,res) => {
    console.log("GET: palette list");
    client.smembers("palette:list", 
        function(err, reply){
            const list = []
            for (let i = 0; i < reply.length; i++) {
                const pid = reply[i]
                console.log("searching "+pid);
                client.multi()
                // get hash data
                .hgetall("palette:"+pid)
                // get color list
                .lrange("palette:"+pid+":colors", 0, -1)
                .exec(
                    function(err, replies){
                        if(replies[0]){
                            const palette = {
                                pid: pid,
                                name: replies[0].name,
                                locked: replies[0].locked,
                                lerp: replies[0].lerp,
                                colors: replies[1]
                            };
                            list.push(palette);
                            if(i == reply.length-1){
                                res.send(list);
                            }
                        }
                        else{
                            console.log("Palette "+pid+" does not exist");
                        }
                    }
                );
                
            }
        }
    );
});

module.exports = colorRoute;