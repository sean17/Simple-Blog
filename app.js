
/**
 * Module dependencies.
 */

var express = require('express');
var jqtpl = require("jqtpl");
var app = module.exports = express.createServer();

// Configuration

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
var posts = [ { id:0, author: "jack", subject: "abc" }, 
              { id:1, author: "mak", subject: "xyz"}, 
              { id:2, author: "sas", subject: "sdfdsf" },
              { id:3, author: "jack", subject: "a's sencond post" }
            ];

//This maintains the blog post at the specified index
app.get('/blog/:uid', function(req, res) {
//specPost 
  var specPost;

  for (var x = 0; x <posts.length; x ++) {
     if (posts[x].id==req.params.uid){
      specPost = posts[x]; // { id:3, author: "sas", subject: "sdfdsf" } 
    }
  }

  res.render("blog", {
    post: specPost
  })
});


//This maintains the all Blog Posts page!
app.get('/blog', function(req, res) {

  
  res.render("allPosts", {
    posts: posts
  })

});

//Renders the new post page
app.get('/create', function(req, res) {

  res.render("create", {
  })
});

//receives the post request from create.html, adds the new post to 
//the pseudo db and pushes back to allposts
app.post('/handleReq', function(req, res) {
    posts.push(req.body.user);
    var q = posts.length-1;
    posts[q].id = q;

  res.render("allPosts", {
    posts:posts
  })

});


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
