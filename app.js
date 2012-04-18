
/**
 * Module dependencies.
 */

var express = require('express');
var jqtpl = require("jqtpl");
var app = module.exports = express.createServer();
var redis = require("redis"),
        client = redis.createClient(null, null, {detect_buffers: true});

   // This will return a JavaScript String
    client.get("foo_rand000000000000", function (err, reply) {
        console.log(reply); // Will print `OK`
    });

    // This will return a Buffer since original key is specified as a Buffer
    client.get(new Buffer("foo_rand000000000000"), function (err, reply) {
        console.log(reply); // Will print `<Buffer 4f 4b>`
    });

// Configuration
//Setting up the server to handle certain views, makes this much more modular!
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set("view engine", "html");
  app.register(".html", jqtpl.express);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// // Routes
//The pseudo database collection that we start with
client.hmset("hosts2", 
      "0", JSON.stringify({ id:0, author: "jack", subject: "abc" }),
      "1", JSON.stringify({ id:1, author: "mak", subject: "xyz"}), 
      "2", JSON.stringify({ id:3, author: "jack", subject: "a's sencond post" }), 
      "3", JSON.stringify({ id:2, author: "sas", subject: "sdfdsf" }));
var posts = [ { id:0, author: "jack", subject: "abc" }, 
              { id:1, author: "mak", subject: "xyz"}, 
              { id:2, author: "sas", subject: "sdfdsf" },
              { id:3, author: "jack", subject: "a's sencond post" }
            ];

stringfja = JSON.stringify([{ id:0, author: "jack", subject: "abc" },{ id:1, author: "mak", subject: "xyz"},{ id:3, author: "jack", subject: "a's sencond post" },{ id:2, author: "sas", subject: "sdfdsf" }]);
  client.set("All", stringfja);
            //This is filling up the redis db with values
var stringfja = JSON.stringify({ id:0, author: "jack", subject: "abc" });
  client.set("0", stringfja);
  stringfja = JSON.stringify({ id:1, author: "mak", subject: "xyz"});
  client.set("1", stringfja);
  stringfja = JSON.stringify({ id:3, author: "jack", subject: "a's sencond post" });
  client.set("3", stringfja);
  stringfja = JSON.stringify({ id:2, author: "sas", subject: "sdfdsf" });
  client.set("2", stringfja);

client.get("All", function (err, reply) {
        console.log(reply); // Will print `OK`
       specPost = JSON.parse(reply);     
   });

var lengthx = 2;
var specPost;
var array = [];
var arrayOBJ = [];
var eachandeverypost;
  // Will print `OK`
    

//This maintains the blog post at the specified index
app.get('/blog/:uid', function(req, res) {
//specPost 
  var specPost;
  //use the uid as a key for redis, return value to render specPost
  client.get(req.params.uid, function (err, reply) {
        console.log(reply); // Will print `OK`
        specPost = JSON.parse(reply);
        res.render("blog", {
        post: specPost
        })      
   });
});

var specPost;
//This maintains the all Blog Posts page!
app.get('/blog', function(req, res) {
var lengthx = 3;


//var array = [];
  // Will print `OK`
         // console.log(reply); 
          //specPost = JSON.parse(reply);
          //array[i] = JSON.parse(reply);
          client.get("0", function (err, obj) {
            console.log(obj);
          specPost = JSON.parse(obj);
          //array[i] = JSON.parse(reply);
          res.render("allPosts", {
          post: specPost
          })
          });
          //array[i] = specPost;
  });

//Renders the new post page
app.get('/create', function(req, res) {

  res.render("create", {
  })
});

//receives the post request from create.html, adds the new post to 
//the pseudo db and pushes back to allposts
var postabc
clientLength = 10;
app.post('/handleReq', function(req, res) {
    var q = client.length-1;
    client.set("0",JSON.stringify(req.body.user));
      client.get("All", function (err, obj) {
        arrayOBJ = obj;
        array = JSON.parse(obj);
        client.set("All",JSON.stringify(req.body.user));
        console.log(JSON.parse(obj));
      res.render("allPosts", {
        posts: array
      });
      })
});

//Add in an edit page
//This page will be accessed from the specifics page
//access the 
var indexPost;
app.get('/edit/:index', function(req, res) {
   indexPost = req.params.index.toString();
   client.get(indexPost, function (err, reply) {
    console.log(reply);
        indexPost = JSON.parse(reply); // Will print `OK`
    });
   
  res.render("edit", {
    post: indexPost
  })
});

app.post('/editResult', function(req, res) {
  client.set("indexPost", JSON.stringify(req.body.user));
  console.log(req.body.user);
  indexPost = req.body.user;
  res.render("allPosts", {
    post:indexPost
  })
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
