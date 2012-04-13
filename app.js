
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
  // app.set('view engine', 'jade');
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
// app.get('/', function(req,res) {
//   var names = ["Sean", "Micheal", "Dinesh", "Magil"]
//   var emails = ["seanzawi", "micheala", "dineshra", "magil"]
//   var r = Math.floor(Math.random() * 4)
//   var date = new Date()
//   var subjects = ["Cool White Kids", "Skeet Skeet mother fucker", "I love brown women", "I miss India"]
  
//   res.render("index", { 
//     title:  names[r]+"| Home page", 
//     date: date,
//     name: names[r],
//     email: emails[r]+"@buffalo.edu",
//   })
// });

var posts = [ { id:1, author: "jack", subject: "abc" }, 
              { id:2, author: "mak", subject: "xyz"}, 
              { id:3, author: "sas", subject: "sdfdsf" },
              { id:4, author: "jack", subject: "a's sencond post" }
            ];

//This maintains the blog post at the specified index
app.get('/blog/:uid', function(req, res) {

  var result;

  for (var x = 0; x <posts.length; x ++) {
     if (posts[x].id==req.params.uid){
      console.log(req.params.uid);
      console.log(posts[x]);
      result = posts[x] // { id:3, author: "sas", subject: "sdfdsf" } 
    }
  }

  res.render("blog", {
    post: result
  })
});


//This maintains the all Blog Posts page!
app.get('/blog', function(req, res) {
  
  res.render("allPosts", {
    posts: posts
  })

});

app.get('/create', function(req, res) {

  res.render("create", {

  })
});

app.post('/handleReq', function(req, res) {
    console.log(req.body.user);
    posts.push(req.body.user);
    var q = posts.length;
    console.log(posts[q-1]);
  
  res.render("allPosts", {
    posts:posts
  })

});


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
