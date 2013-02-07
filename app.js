var express = require('express'),
    passport = require('passport'),
    util = require('util'),
    FacebookStrategy = require('passport-facebook').Strategy,
    jQuery = require('jquery'),
    FACEBOOK_APP_ID = "472891892763096",
    FACEBOOK_APP_SECRET = "04ff2e9610264f40d9881428459c5c89",
    FB = require('fb'),
    YQL = require("yql");
    
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


//高雄市政府
new YQL.exec('select * from data.html.cssselect where url="http://socbu.kcg.gov.tw/?prog=1&b_id=5" and css=".content"', function(response) {
  for (var j = 0, div1 = response.query.results.results.div[0].table.tr.length; j < div1; j++)
    for (var i = 0, div2 = response.query.results.results.div[0].table.tr[0].td.length; i < div2; i++){
      console.log(response.query.results.results.div[0].table.tr[j].td[i].a.href);
      var dataurl = response.query.results.results.div[0].table.tr[j].td[i].a.href;
      var ksg = 'http://socbu.kcg.gov.tw/';
      ksg += response.query.results.results.div[0].table.tr[j].td[i].a.href;
      var yql_url = 'select * from data.html.cssselect where url="'+ksg+'" and css=".content"';

      //找該檔案的內容
      new YQL.exec(yql_url, function(res) {
        console.log ('詳情'+res.query.results.results.div.strong[0].content);
      });

      console.log(response.query.results.results.div[0].table.tr[j].td[i].a.title);
      console.log(response.query.results.results.div[0].table.tr[j].td[i].a.content);
    }
});
//


app.get('/', function(req, res) {
  res.render('index', {
    user: req.user
  });
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/listening',function(req,res){

  res.render('listening', {
    user: 'yoyom'
  });
})
app.post('/listening', function(req, res){
  console.log(req.body.name);
});
//Login mongoDB
app.get('/buyearphone', function(req, res) {
  res.render('buyearphone', {
    user: 'yoyom'
  });
});
app.get('/education', function(req, res) {
  res.render('education', {
    user: 'yoyom'
  });
});
app.get('/showlistening', function(req, res) {
  res.render('showlistening', {
    user: 'yoyom'
  });
});
app.post('/new', function(req, res){
  res.render('showlistening', {
    user: 'yoyom'
  });
});
app.listen(process.env.PORT || 3000);
