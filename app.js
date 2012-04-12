
/**
 * Module dependencies.
 */

var express = require('express')
var jqtpl = require("jqtpl")

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

// Routes
app.get('/', function(req,res) {
  var names = ["Sean", "Micheal", "Dinesh", "Magil"]
  var emails = ["seanzawi", "micheala", "dineshra", "magil"]
  var r = Math.floor(Math.random() * 4)
  var date = new Date()
  var subjects = ["Cool White Kids", "Skeet Skeet mother fucker", "I love brown women", "I miss India"]
  res.render("index", { 
    title:  names[r]+"| Home page", 
    date: date,
    name: names[r],
    email: emails[r]+"@buffalo.edu",
  })
});
var poststring = "";
var result =[];
app.get('/blog/:index', function(req, res) {
  var posts = [{ author: "a", post: "abc" }, { author: "z", post: "xyz"}, { author: "sas", post: "sdfdsf" },{ author: "a", post: "a's sencond post" }];
  for(i = 0; i < posts.length; i++) {
      if(posts[i].author==req.params.index) {
        try {
          result.push(posts[i].post);
        } catch(e) {

        }
      }
    }
    for (x=0; x < result.length; x++) {
      poststring = poststring + (result[x] + ",");
    }
//      if(posts[req.params.index].author==)
     // author:post
  // req.params

  res.render("blog", {
//author: posts[req.params.index].author,//.author,
    //post: posts[req.params.index].post//.pos
    author: req.params.index,
    post: poststring
  })
});

app.get('/projects/:index', function(req, res) {
  var posts = [{ author: "a", post: "abc" }, { author: "z", post: "xyz"}, { author: "sas", post: "sdfdsf" },{ author: "a", post: "a's sencond post" }];
  for(i = 0; i < posts.length; i++) {
      if(posts[i].author==req.params.index) {
        var result = posts[i].post
      }
    }
//      if(posts[req.params.index].author==)
     // author:post
  // req.params

  res.render("blog", {
//author: posts[req.params.index].author,//.author,
    //post: posts[req.params.index].post//.pos
    author: req.params.index,
    post: result
  })
});
app.get('/allPosts/:xzy', function(req, res) {
  //Dumby array of authors and posts
  var posts = [{ author: "a", post: "abc" }, { author: "z", post: "xyz"}, { author: "sas", post: "sdfdsf" },];
  for(i = 0; i < posts.length; i++) {
    console.log("abd");
    //Check to see if the user is an author of any posts
      if(posts[i].author==req.params.xzy) {
        //If user is an author, display the post
        var result = posts[i].post
      }
    }
    //Render the blog page, updating the author and posts dynamically
  res.render("allPosts", {
    author: req.params.xzy,
    post: result
  })
});
app.get('/projects', function(req,res) {
  res.render("projects", { title: "Sean Zaw | Project page"})
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
