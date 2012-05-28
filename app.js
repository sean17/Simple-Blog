
/**
 * Module dependencies.
 */

var express = require('express');
var jqtpl = require("jqtpl");
var app = module.exports = express.createServer();
var redis = require("redis"),
        client = redis.createClient(null, null, {detect_buffers: true});
var lengthx = 2;
var specPost;
var array = [];
var posts = [];
var x = 1;
var numOfPosts = 0;
var arrayLength;
var arrayOBJ = [];
var eachandeverypost;
var indexPost;
indexPostOld = "";
   
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

//The pseudo database collection that we start with

// stringfja = JSON.stringify([{ id:0, author: "jack", subject: "abc" },{ id:1, author: "mak", subject: "xyz"},{ id:3, author: "jack", subject: "a's sencond post" },{ id:2, author: "sas", subject: "sdfdsf" }]);
  
// client.set("All", stringfja);
            //This is filling up the redis db with values
stringfja = { author: "jack", subject: "abc", cont: "First set of content", time:"" };
  client.set(stringfja.subject, JSON.stringify(stringfja));
  console.log(stringfja.subject)
  stringfja = { author: "mak", subject: "xyz", cont: "Second set of content", time:""};
  client.set(stringfja.subject, JSON.stringify(stringfja));
  console.log(stringfja.subject)

var listOfPosts = ["abc", "xyz"];
/*
key = "blog"

value = Array of posts
post = {id: 1, author: "test", subject: 'w00t'}

[{id: 1, author: "test", subject: 'w00t'},
{id: 2, author: "test", subject: 'w00t'},
{id: 3, author: "test", subject: 'w00t'},
{id: 4, author: "test", subject: 'w00t'},
{id: 5, author: "test", subject: 'w00t'}]

// /blog => index
client.get("blog", function ( err, res ) {
  res.render("template", {posts: res})
})

// /create => create


app.post("/create", function (req, res)) {

  client.get("blog", function (err, posts) {
    posts.push({id: posts.length+1, author: JSON.stringify(req.body.user), subject: JSON.stringify(req.body.subject)})

    client.set("blog", posts, function (err, result) {
      res.redirect("/blog");
    })

  })
}
*/



// Will print `OK`    
//This maintains the blog post at the specified index
app.get('/blog/:uid', function(req, res) {
  //use the uid as a key for redis, return value to render specPost
  console.log('fuck you i"m in Blog/uid');
  var xqa = req.params.uid;
  console.log(xqa);
  client.get(xqa, function (err, reply) {
        console.log(reply); // Will print `OK`
        specPost = JSON.parse(reply);
        res.render("blog", {
        post: specPost
        })      
   });
});

function queryDB(query, resultReturn) {
  resultReturn(query);
};

function renderResults(resultReturn, sendResults) {
  sendResults(resultReturn);
};

//This maintains the all Blog Posts page!
app.get('/blog', function(req, res) {
x = 0;
xaz = 0;
var xyza = null;
collectDB(x, function() {
    for(x = 0; x < listOfPosts.length; x++) {
       xyza = listOfPosts[x]
       console.log('console size = '+ xyza);
      client.get(xyza, function (err, reply) {
        if (err) {
          console.log('error');
        }
        specPost = JSON.parse(reply);
        posts.unshift(specPost);
        respondClient(0, function(reqa, resa) {
          if (xaz == listOfPosts.length-1) {
            res.render("allPosts", { posts: posts });
            posts = [];
          } xaz++;
        });
      }); 
    }
  }); 
});

function collectDB(reqa, resa) {
  setTimeout(100, resa(reqa)); 
}

function respondClient(reqb, resb) {
  resb(reqb);
}

    
//receives the post request from create.html, adds the new post to 
//the pseudo db and pushes back to allposts
var postabc;
clientLength = 10;
var postObject;
var postSubject;
var postContent = "random text";
var postAuthor;
app.post('/create', function(req, res) {
  // globalVar++
  postObject = req.body.user;
  var subject = postObject.subject;
  console.log(subject + '-----------jalfdksjlafeij');
  stringfja = {author: JSON.stringify(postObject.author), subject: JSON.stringify(postObject.subject), cont: "First set of content", time:"" };
  //client.set(stringfja.subject, JSON.stringify(stringfja));
  //console.log('postObject at this point equals' + postObject + 'and the subject ==' + postObject.subject);
  listOfPosts.unshift(stringfja.subject) 
  console.log("the list of posts at 0 is: " + listOfPosts[0]);
  client.set(stringfja.subject, JSON.stringify(stringfja), function ( err, result ) {
    if (err) exit(1);
    numOfPosts++;
    res.redirect("/blog");
  });
  
});


//Renders the new post page
app.get('/new', function(req, res) {
  res.render("create");
});


//Add in an edit page
//This page will be accessed from the specifics page
//access the 
app.get('/edit/:index', function(req, res) {
   indexPost = req.params.index;
   console.log(indexPost+'howdy, im the index post');
   //indexPost = indexPost.subject;
   indexPostOld = indexPost;
   client.get(indexPost, function (err, reply) {
    console.log(indexPost);
        indexPost = JSON.parse(reply); // Will print `OK`
    });
  res.render("edit", {
    post: indexPost
  })
});

app.post('/editResult', function(req, res) {
  //console.log(req.body.user);
  //console.log(indexPostOld);
  var value = req.body.user;
  valueAuth = value.author.toString();
  valueSubj = value.subject.toString();
  valueCont = value.cont.toString();
  for(x = 0; x < listOfPosts.length; x++) {
    stringfja = {author: JSON.stringify(valueAuth), subject: JSON.stringify(valueSubj), cont: valueCont, time:"" };
    if(listOfPosts[x]==indexPostOld){
        listOfPosts[x] = value.subject;
        value.time = "sometime";
        console.log('the time of the post is : ' + JSON.stringify(value)+ 'the author is' + value.author);
        client.set(valueSubj, JSON.stringify(value));
        res.redirect('/blog');
    }
  }
});


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
