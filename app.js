var express = require('express'),
  passport = require('passport'),
  util = require('util'),
  FacebookStrategy = require('passport-facebook').Strategy,
  jQuery = require('jquery');

var FACEBOOK_APP_ID = "472891892763096";
var FACEBOOK_APP_SECRET = "04ff2e9610264f40d9881428459c5c89";
var FB = require('fb');
var YQL = require("yql");
//var AM = require('./server/account-manager');


  
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




//put in data ------------------------------------------

  //NYT
  var NYTdata = [
     { title: "Author", url: "http://www.nytimes.com/services/xml/rss/nyt/Arts.xml" },
     { title: "Arts", url: "http://www.nytimes.com/services/xml/rss/nyt/Arts.xml" },
     { title: "Automobiles", url: "http://www.nytimes.com/services/xml/rss/nyt/Automobiles.xml" },
     { title: "Books", url: "http://www.nytimes.com/services/xml/rss/nyt/Books.xml" },
     { title: "Business", url: "http://www.nytimes.com/services/xml/rss/nyt/Business.xml" },
     { title: "Campaign 2004", url: "http://www.nytimes.com/services/xml/rss/nyt/Campaigns.xml" },
     { title: "Circuits", url: "http://www.nytimes.com/services/xml/rss/nyt/Circuits.xml" },
     { title: "Editorials/Op-Ed", url: "http://www.nytimes.com/services/xml/rss/nyt/Opinion.xml" },
     { title: "Fashion & Style", url: "http://www.nytimes.com/services/xml/rss/nyt/FashionandStyle.xml" },
     { title: "Health", url: "http://www.nytimes.com/services/xml/rss/nyt/Health.xml" },
     { title: "International", url: "http://www.nytimes.com/services/xml/rss/nyt/International.xml" },
     { title: "Magazine", url: "http://www.nytimes.com/services/xml/rss/nyt/Magazine.xml" },
     { title: "Media & Advertising", url: "http://www.nytimes.com/services/xml/rss/nyt/MediaandAdvertising.xml" },
     { title: "Most E-Mailed Articles", url: "http://www.nytimes.com/services/xml/rss/nyt/pop_top.xml" },
     { title: "Movies", url: "http://www.nytimes.com/services/xml/rss/nyt/Movies.xml" },
     { title: "Multimedia", url: "http://www.nytimes.com/services/xml/rss/nyt/Multimedia.xml" },
     { title: "National", url: "http://www.nytimes.com/services/xml/rss/nyt/National.xml" },
     { title: "New York Region", url: "http://www.nytimes.com/services/xml/rss/nyt/NYRegion.xml" },
     { title: "NYTimes.com Home Page", url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml" },
     { title: "Real Estate", url: "http://www.nytimes.com/services/xml/rss/nyt/RealEstate.xml" },
     { title: "Science", url: "http://www.nytimes.com/services/xml/rss/nyt/Science.xml" },
     { title: "Sports", url: "http://www.nytimes.com/services/xml/rss/nyt/Sports.xml" },
     { title: "Technology", url: "http://www.nytimes.com/services/xml/rss/nyt/Technology.xml" },
     { title: "Theater", url: "http://www.nytimes.com/services/xml/rss/nyt/Theater.xml" },
     { title: "Times on the Trail", url: "http://www.nytimes.com/services/xml/rss/nyt/Trail.xml" },
     { title: "Travel", url: "http://www.nytimes.com/services/xml/rss/nyt/Travel.xml" },
     { title: "Washington", url: "http://www.nytimes.com/services/xml/rss/nyt/Washington.xml" },
     { title: "Week in Review", url: "http://www.nytimes.com/services/xml/rss/nyt/WeekinReview.xml" }
  ];
  var CNNdata = [
     { title: "Arts", url: "http://www.nytimes.com/services/xml/rss/nyt/Arts.xml" },
     { title: "Automobiles", url: "http://www.nytimes.com/services/xml/rss/nyt/Automobiles.xml" },
     { title: "Books", url: "http://www.nytimes.com/services/xml/rss/nyt/Books.xml" },
     { title: "Business", url: "http://www.nytimes.com/services/xml/rss/nyt/Business.xml" },
     { title: "Campaign 2004", url: "http://www.nytimes.com/services/xml/rss/nyt/Campaigns.xml" },
     { title: "Circuits", url: "http://www.nytimes.com/services/xml/rss/nyt/Circuits.xml" },
     { title: "Editorials/Op-Ed", url: "http://www.nytimes.com/services/xml/rss/nyt/Opinion.xml" },
     { title: "Fashion & Style", url: "http://www.nytimes.com/services/xml/rss/nyt/FashionandStyle.xml" },
     { title: "Health", url: "http://www.nytimes.com/services/xml/rss/nyt/Health.xml" },
     { title: "International", url: "http://www.nytimes.com/services/xml/rss/nyt/International.xml" },
     { title: "Magazine", url: "http://www.nytimes.com/services/xml/rss/nyt/Magazine.xml" },
     { title: "Media & Advertising", url: "http://www.nytimes.com/services/xml/rss/nyt/MediaandAdvertising.xml" },
     { title: "Most E-Mailed Articles", url: "http://www.nytimes.com/services/xml/rss/nyt/pop_top.xml" },
     { title: "Movies", url: "http://www.nytimes.com/services/xml/rss/nyt/Movies.xml" },
     { title: "Multimedia", url: "http://www.nytimes.com/services/xml/rss/nyt/Multimedia.xml" },
     { title: "National", url: "http://www.nytimes.com/services/xml/rss/nyt/National.xml" },
     { title: "New York Region", url: "http://www.nytimes.com/services/xml/rss/nyt/NYRegion.xml" },
     { title: "NYTimes.com Home Page", url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml" },
     { title: "Real Estate", url: "http://www.nytimes.com/services/xml/rss/nyt/RealEstate.xml" },
     { title: "Science", url: "http://www.nytimes.com/services/xml/rss/nyt/Science.xml" },
     { title: "Sports", url: "http://www.nytimes.com/services/xml/rss/nyt/Sports.xml" },
     { title: "Technology", url: "http://www.nytimes.com/services/xml/rss/nyt/Technology.xml" },
     { title: "Theater", url: "http://www.nytimes.com/services/xml/rss/nyt/Theater.xml" },
     { title: "Times on the Trail", url: "http://www.nytimes.com/services/xml/rss/nyt/Trail.xml" },
     { title: "Travel", url: "http://www.nytimes.com/services/xml/rss/nyt/Travel.xml" },
     { title: "Washington", url: "http://www.nytimes.com/services/xml/rss/nyt/Washington.xml" },
     { title: "Week in Review", url: "http://www.nytimes.com/services/xml/rss/nyt/WeekinReview.xml" }
  ]
  var NBAdata;
  var MLBdata=[
     { title: "MLB", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/mlb.xml" },
     { title: "Los Angeles Angels of Anaheim", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/ana.xml" },
     { title: "Oakland Athletics", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/oak.xml" },
     { title: "Toronto Blue Jays", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/tor.xml" },
     { title: "Tampa Bay Rays", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/tb.xml" },
     { title: "Cleveland Indians", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/cle.xml" },
     { title: "Seattle Mariners", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/sea.xml" },
     { title: "Baltimore Orioles", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/bal.xml" },
     { title: "Texas Rangers", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/tex.xml" },
     { title: "Boston Red Sox", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/box.xml" },
     { title: "Kansas City Royals", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/kc.xml" },
     { title: "Detroit Tigers", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/det.xml" },
     { title: "Minnesota Twins", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/min.xml" },
     { title: "Chicago White Sox", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/cws.xml" },
     { title: "New York Yankees", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/nyy.xml" },
     { title: "Houston Astros", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/hou.xml" },
     { title: "Atlanta Braves", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/atl.xml" },
     { title: "Milwaukee Brewers", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/mil.xml" },
     { title: "St. Louis Cardinals", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/stl.xml" },
     { title: "Chicago Cubs", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/chc.xml" },
     { title: "Arizona Diamondbacks", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/ari.xml" },
     { title: "Los Angeles Dodgers", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/lad.xml" },
     { title: "San Francisco Giants", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/sf.xml" },
     { title: "Miami Marlins", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/mia.xml" },
     { title: "New York Mets", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/nym.xml" },
     { title: "Washington Nationals", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/was.xml" },
     { title: "San Diego Padres", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/sd.xml" },
     { title: "Philadelphia Phillies", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/phi.xml" },
     { title: "Pittsburgh Pirates", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/pit.xml" },
     { title: "Cincinnati Reds", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/cin.xml" },
     { title: "Colorado Rockies", url: "http://mlb.mlb.com/partnerxml/gen/news/rss/col.xml" }

  ]
  var PTTdata;









// Use the FacebookStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Facebook
//   profile), and invoke a callback with a user object.
var showpagedata = function(){};


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
    var getfinalcategoryresault = new Array();
    newsum.sort(sortNumber);  
    console.log(newsum);
    for(var fncount = 2 ; fncount < 12;fncount++) {
      for (var i = 0; i < unicategorysum.length; i++) {  
        if (unicategorysum[i] == newsum[newsum.length - fncount]) {  
            //document.write("出现次数最多的元素是：" + yuansu[i] + "次数为：" + sum[i] + "<br/>");  
            console.log("可能喜歡的東西是：" + getunicategory[i] + "次数为：" + unicategorysum[i]);  
            getfinalcategoryresault.push({category: getunicategory[i],times:unicategorysum[i]});
        }  
      }  
    }

    for (var yokey in getfinalcategoryresault){
    console.log('比對後資料集成  分類：'+ getfinalcategoryresault[yokey].category+'總數：'+getfinalcategoryresault[yokey].times);
    }
    var getsearchresault = new Array();
    for(var yokey in getfinalcategoryresault){

      //比對NYT data
      for (var key in NYTdata){
         if (getfinalcategoryresault[yokey].category == NYTdata[key].title){
            console.log(NYTdata[key].title);
            getsearchresault.push({source:'NYT',category:NYTdata[key].title,url:NYTdata[key].url})
         }
      }
      //比對NYT data
      //比對NYT data
      //比對NYT data
      //比對NYT data
    }
    //show出結果
    for (var key in getsearchresault){
      console.log('比對後的結果如右'+getsearchresault[key].category);
      console.log('網址是：'+getsearchresault[key].url);

      var feedburnerUrl = getsearchresault[key].url,
      feedUrl = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&output=json&num=999&q=" + encodeURIComponent(feedburnerUrl);

      jQuery.ajax({
        url: feedUrl,
        type: 'GET',
        //dataType: 'xml/html/script/json/jsonp',
       // data: {param1: 'value1'},
        complete: function(result) {
         // console.log(result);
          var jsonData = JSON.parse(result.responseText);
          console.log(jsonData.responseData.feed.entries[0].title);

        },
        success: function(res) {
          console.log(res);
        },
        
      });
      

    };





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

app.get('/header',function(req, res) {

  //console.log(req);

  res.render('header', {
    user: 'yoyom'
  });
});


//抓現在時間
app.get('/time',function(req, res) {
  var now = new Date();
  now = now.getTime() ;
  console.log(now);
  var finaltime = strtotime('+4 seconds',now);
  console.log('終點時間'+finaltime);
  countdown();
  function countdown(){
      var now1 = new Date();
      now1 = now1.getTime() ;
      console.log('nowaaaaaa'+now1);
      console.log('finaltime'+finaltime);
       if (now1 - finaltime >=4000){
         console.log('耶比');
       }
      setTimeout(countdown,1000)
  }   
});
app.get('/listening',function(req,res){

  res.render('listening', {
    user: 'yoyom'
  });
})

//Login mongoDB
app.get('/testMongodb', function(req, res) {


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

function re(){
  return req='hihi' 
}

function toBase64(str) {
  return new Buffer(str).toString('base64');
}
function sortNumber(a, b)
{
return a - b
}
function strtotime(text, now) {
  // Convert string representation of date and time to a timestamp  
  // 
  // version: 1109.2015
  // discuss at: http://phpjs.org/functions/strtotime
  // +   original by: Caio Ariede (http://caioariede.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: David
  // +   improved by: Caio Ariede (http://caioariede.com)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Wagner B. Soares
  // +   bugfixed by: Artur Tchernychev
  // +   improved by: A. Matías Quezada (http://amatiasq.com)
  // %        note 1: Examples all have a fixed timestamp to prevent tests to fail because of variable time(zones)
  // *     example 1: strtotime('+1 day', 1129633200);
  // *     returns 1: 1129719600
  // *     example 2: strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200);
  // *     returns 2: 1130425202
  // *     example 3: strtotime('last month', 1129633200);
  // *     returns 3: 1127041200
  // *     example 4: strtotime('2009-05-04 08:30:00');
  // *     returns 4: 1241418600
  if (!text)
      return null;

  // Unecessary spaces
  text = text.trim()
      .replace(/\s{2,}/g, ' ')
      .replace(/[\t\r\n]/g, '')
      .toLowerCase();

  var parsed;

  if (text === 'now')
      return now === null || isNaN(now) ? new Date().getTime() / 1000 | 0 : now | 0;
  else if (!isNaN(parse = Date.parse(text)))
      return parse / 1000 | 0;
  if (text == 'now')
      return new Date().getTime() / 1000; // Return seconds, not milli-seconds
  else if (!isNaN(parsed = Date.parse(text)))
      return parsed / 1000;

  var match = text.match(/^(\d{2,4})-(\d{2})-(\d{2})(?:\s(\d{1,2}):(\d{2})(?::\d{2})?)?(?:\.(\d+)?)?$/);
  if (match) {
      var year = match[1] >= 0 && match[1] <= 69 ? +match[1] + 2000 : match[1];
      return new Date(year, parseInt(match[2], 10) - 1, match[3],
          match[4] || 0, match[5] || 0, match[6] || 0, match[7] || 0) / 1000;
  }

  var date = now ? new Date(now * 1000) : new Date();
  var days = {
      'sun': 0,
      'mon': 1,
      'tue': 2,
      'wed': 3,
      'thu': 4,
      'fri': 5,
      'sat': 6
  };
  var ranges = {
      'yea': 'FullYear',
      'mon': 'Month',
      'day': 'Date',
      'hou': 'Hours',
      'min': 'Minutes',
      'sec': 'Seconds'
  };

  function lastNext(type, range, modifier) {
      var day = days[range];

      if (typeof(day) !== 'undefined') {
          var diff = day - date.getDay();

          if (diff === 0)
              diff = 7 * modifier;
          else if (diff > 0 && type === 'last')
              diff -= 7;
          else if (diff < 0 && type === 'next')
              diff += 7;

          date.setDate(date.getDate() + diff);
      }
  }
  function process(val) {
      var split = val.split(' ');
      var type = split[0];
      var range = split[1].substring(0, 3);
      var typeIsNumber = /\d+/.test(type);

      var ago = split[2] === 'ago';
      var num = (type === 'last' ? -1 : 1) * (ago ? -1 : 1);

      if (typeIsNumber)
          num *= parseInt(type, 10);

      if (ranges.hasOwnProperty(range))
          return date['set' + ranges[range]](date['get' + ranges[range]]() + num);
      else if (range === 'wee')
          return date.setDate(date.getDate() + (num * 7));

      if (type === 'next' || type === 'last')
          lastNext(type, range, num);
      else if (!typeIsNumber)
          return false;

      return true;
  }

  var regex = '([+-]?\\d+\\s' +
      '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' +
      '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' +
      '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday)|(last|next)\\s' +
      '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' +
      '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' +
      '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday))(\\sago)?';

  match = text.match(new RegExp(regex, 'gi'));
  if (!match)
      return false;

  for (var i = 0, len = match.length; i < len; i++)
      if (!process(match[i]))
          return false;

  // ECMAScript 5 only
  //if (!match.every(process))
  // return false;

  return (date.getTime() / 1000);
}
function fntime(){
    return (new Date()).getTime() / 1000;
}