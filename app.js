var express = require('express'),
  passport = require('passport'),
  util = require('util'),
  FacebookStrategy = require('passport-facebook').Strategy;

var FACEBOOK_APP_ID = "472891892763096"
var FACEBOOK_APP_SECRET = "04ff2e9610264f40d9881428459c5c89";
var FB = require('fb');
var YQL = require("yql");
// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Facebook profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Use the FacebookStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Facebook
//   profile), and invoke a callback with a user object.
passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback"
}, function(accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  //console.log('fuckingaccessToken:'+accessToken);
  FB.api('/me/likes', {
    fields: ['category'],
    access_token: accessToken
  }, function(res) {

    var getfblikes = new Array();
    var getunicategory = new Array();
    for(var key in res.data) {
      getfblikes[key] = res.data[key].category;
    }
    console.log('我得到了:' + getfblikes);
    
    //簡化作法1---------------------------------------------
    // getfblikes.forEach(function(value) {
    //   if(getunicategory.indexOf(value) == -1) {
    //     getunicategory.push(value);
    //   }
    // });
    //console.log('我簡化了:' + getunicategory);

    //簡化並算出重覆次數2-------------------------------------
    var count = 1;  
    var getunicategory= new Array();//存放数组array的不重复的元素比如{4,5,7,8,2,67,89,}  
    var unicategorysum = new Array(); //存放数组array中每个不同元素的出现的次数  
    for (var i = 0; i < getfblikes.length; i++) {   
        for(var j=i+1;j<getfblikes.length;j++)  
        {  
            if (getfblikes[i] == getfblikes[j]) {  
                count++;//用来计算与当前这个元素相同的个数  
                getfblikes.splice(j, 1); //若相同，把這元素一除掉 
                j--;   
            }  
        }  
        getunicategory[i] = getfblikes[i];//将当前的元素存入到yuansu数组中  
        unicategorysum[i] = count;  //并且将有多少个当前这样的元素的个数存入unicategorysum数组中  
        count =1;  //再将count重新赋值，进入下一个元素的判断  
    }  
    console.log('我簡化了：'+ getfblikes);//這時候array已變
    
    console.log('我簡化了：'+ getunicategory);
    console.log('出現次數：'+unicategorysum);
    //讓數值由高到低排列---------------------------------------
    var newsum = new Array(); //  sum;  
    for (var key in unicategorysum) {  
      newsum[key] = unicategorysum[key];  
    }  
    newsum.sort(sortNumber);  
    console.log(newsum);
    for(var fncount = 2 ; fncount < 12;fncount++) {
      for (var i = 0; i < unicategorysum.length; i++) {  
        if (unicategorysum[i] == newsum[newsum.length - fncount]) {  
            //document.write("出现次数最多的元素是：" + yuansu[i] + "次数为：" + sum[i] + "<br/>");  
            console.log("可能喜歡的東西是：" + getunicategory[i] + "次数为：" + unicategorysum[i]);  
        }  
      }  
    }
    //把上面資料寫入資料庫-------------------------------------

    









  })







  //get closed friend start
  FB.api('/me/friendlists', {
    fields: ['id'],
    access_token: accessToken
  }, function(res) {
    var closedfrfbid = res.data[0].id;

    FB.api(closedfrfbid + '/members', {
      fields: 'id,name',
      access_token: accessToken
    }, function(res) {
      var getclosedfr_id = new Array();
      var getclosedfr_name = new Array();
      for(var key in res.data) {
        getclosedfr_id[key] = res.data[key].id;
        getclosedfr_name[key] = res.data[key].name;
      }
      console.log('我親密朋友的id:' + getclosedfr_id);
      console.log('我親密朋友的name:' + getclosedfr_name);
    })


    //get closed fr posts
    // for (var key in getclosedfr_id){
      
    //   var thisfr_postid = new Array();
    //   FB.api(getclosedfr_id[key]+'/friendlists', {
    //     fields: 'id,message',
    //     access_token: accessToken
    //   }, function(res) {

    //     for (var key in res.data){
    //       thisfr_postid[key]= res.data[key].id
    //     }
    //     console.log('this is:'+key+'的'+thisfr_postid)
    //   })
    // }

  })

  process.nextTick(function() {

    // To keep the example simple, the user's Facebook profile is returned to
    // represent the logged-in user.  In a typical application, you would want
    // to associate the Facebook account with a user record in your database,
    // and return that user instead.
    return done(null, profile);
  });
}));



var app = express();
// configure Express
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({
    secret: 'keyboard cat'
  }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});


app.get('/', function(req, res) {
  res.render('index', {
    user: req.user
  });
});

app.get('/account', ensureAuthenticated, function(req, res) {
  res.render('account', {
    user: req.user
  });

});

app.get('/login', function(req, res) {
  res.render('login', {
    user: req.user
  });
});

// GET /auth/facebook
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Facebook authentication will involve
//   redirecting the user to facebook.com.  After authorization, Facebook will
//   redirect the user back to this application at /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['read_stream', 'publish_actions', 'user_likes']
}), function(req, res) {



  // console.log('req:'+req);
});

// GET /auth/facebook/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  scope: ['read_stream', 'publish_actions', 'user_likes']
}), function(req, res) {
  var accessToken = req.access_token;
  console.log('yooooooooo:' + accessToken)
  res.redirect('/account');
  //console.log('yooyooooooo');
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});



//parse Html by YQL
app.get('/parse', function(req, res) {

  new YQL.exec('select * from data.html.cssselect where url="http://net.tutsplus.com/" and css=".post_title a"', function(response) {
      //response consists of JSON that you can parse
  

  });

});


app.listen(3000);


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.


function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login')
}

function toBase64(str) {
  return new Buffer(str).toString('base64');
}
function sortNumber(a, b)
{
return a - b
}