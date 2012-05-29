
/**
 * Module dependencies.
 */
var express = require('express'),
    jqtpl = require("jqtpl"),
    app = module.exports = express.createServer(),
    redis = require("redis"),
    client = redis.createClient(null, null, {detect_buffers: true}),
    specPost,
    posts = [],
    x = 1,
    numOfPosts = 0,
    arrayLength,
    arrayOBJ = [],
    indexPost,
    indexPostOld = "",
    clientLength = 10,
    postObject;
var postSubject;
var postContent = "random text";
var postAuthor;
var timeVal = new Date;
var newTime = timeVal.getTime();
var listOfPosts = [];
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

/*
stringfja = { author: "jack", subject: "abc", cont: "First set of content", timeVal:newTime };
  client.set(stringfja.subject, JSON.stringify(stringfja));
  stringfja = { author: "mak", subject: "xyz", cont: "Second set of content", timeVal:newTime};
  client.set(stringfja.subject, JSON.stringify(stringfja));
 

var listOfPosts = ["abc", "xyz"];
*//*
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
  var xqa = req.params.uid;
  client.get(xqa, function (err, reply) {
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
xaz = 0;
var xyza = null;
collectDB(x, function() {
  if(listOfPosts[0] ==null) {
    res.render("allPosts");
  }
    for(x = 0; x < listOfPosts.length; x++) {
       xyza = listOfPosts[x]
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

app.post('/create', function(req, res) {
  // globalVar++
  var value = req.body.user;
  valueAuth = value.author.toString();
  valueSubj = value.subject.toString();
  valueCont = value.cont.toString();
  postObject = req.body.user;
  var subject = postObject.subject;
  var newTime = timeVal.getTime();
  stringfja = {author: valueAuth, subject: valueSubj, cont: valueCont, timeVal:newTime };
  listOfPosts.unshift(stringfja.subject) 
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
  //indexPost = indexPost.subject;
   indexPostOld = indexPost;
   client.get(indexPost, function (err, reply) {
        indexPost = JSON.parse(reply); // Will print `OK`
    });
  res.render("edit", {
    post: indexPost
  })
});

app.post('/editResult', function(req, res) {
  var value = req.body.user;
  valueAuth = value.author.toString();
  valueSubj = value.subject.toString();
  valueCont = value.cont.toString();
  newTime = timeVal.getTime();
  for(x = 0; x < listOfPosts.length; x++) {
    stringfja = {author: JSON.stringify(valueAuth), subject: JSON.stringify(valueSubj), cont: valueCont, timeVal:newTime };
    if(listOfPosts[x]==indexPostOld){
        listOfPosts[x] = value.subject;
        //value.time = "sometime";
        client.set(valueSubj, JSON.stringify(value));
        res.redirect('/blog');
    }
  }
});


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
