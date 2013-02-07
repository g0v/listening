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

//記錄身障福利法規
//新北市(NTPG)    http://www.sw.ntpc.gov.tw/_file/1588/SG/24725/D.html
//高雄市(KSG)     http://socbu.kcg.gov.tw/?prog=1&b_id=5
//台北市政府(TPG)  （馬的不能爬 ）https://www.e-services.taipei.gov.tw/hypage.cgi?HYPAGE=index_01.htm&clsid0=1&clsid1=17&clsid2=62&cond=all&total_srv=#showname_place
//台中市政府(TCG)  http://www.society.taichung.gov.tw/section/index.asp?Parser=99,16,257,,,,,,,,1,8,,4

//基隆市政府(KLG)  http://exlaw.klcg.gov.tw/SearchAllResultList.aspx?KeyWord=%E8%BA%AB%E5%BF%83%E9%9A%9C%E7%A4%99&Cur=L
//基隆市政府可以打關鍵字搜尋

//新竹市政府(HCG)  http://society.hccg.gov.tw/web/SelfPageSetup?command=display&pageID=22305&FP=39122
//台南市政府(TNG)  http://social.tncg.gov.tw/social/socpage.asp?nsub=C0A300
//南投縣政府(NTG)  http://www.nantou.gov.tw/big5/download.asp?dptid=376480000AU130000&catetype=01&cid=957

//桃園縣政府(TYG)  
//行政規則   http://www.tycg.gov.tw/ch/home.jsp?id=15&parentpath=0,1,12&mcustomize=law_list.jsp
//自治規則   http://law.tycg.gov.tw/SearchAllResultList.aspx?KeyWord=%E8%BA%AB%E5%BF%83%E9%9A%9C%E7%A4%99&Cur=L
//桃園政府可以打關鍵字搜尋

//高雄市政府
new YQL.exec('select * from data.html.cssselect where url="http://socbu.kcg.gov.tw/?prog=1&b_id=5" and css=".content"', function(response) {
    for (var j = 0, div1 = response.query.results.results.div[0].table.tr.length; j < div1; j++){
        for (var i = 0, div2 = response.query.results.results.div[0].table.tr[0].td.length; i < div2; i++){
            //console.log(response.query.results.results.div[0].table.tr[j].td[i].a.href);
            var dataurl = response.query.results.results.div[0].table.tr[j].td[i].a.href;
            var ksg = 'http://socbu.kcg.gov.tw/';
            ksg += response.query.results.results.div[0].table.tr[j].td[i].a.href;
            var yql_url = 'select * from data.html.cssselect where url="'+ksg+'" and css=".content"';

            //找該檔案的內容
            new YQL.exec(yql_url, function(res) {
              //console.log ('詳情'+res.query.results.results.div.strong[0].content);
            });
            //console.log(response.query.results.results.div[0].table.tr[j].td[i].a.title);
            //console.log(response.query.results.results.div[0].table.tr[j].td[i].a.content);
        }
    }
});

//新北市政府
new YQL.exec('select * from data.html.cssselect where url="http://www.sw.ntpc.gov.tw/_file/1588/SG/24725/D.html" and css=".dlarktext-13"', function(response) {
    for (var k = 0, div1 = response.query.results.results.td.length; k < div1; k++){
        if (response.query.results.results.td[k].a != null){
            //console.log(response.query.results.results.td[k].a.href);
            //console.log(response.query.results.results.td[k].a.title);
            var NTPG = 'http://www.sw.ntpc.gov.tw'
            NTPG += response.query.results.results.td[k].a.href;
            var yql_url = 'select * from data.html.cssselect where url="'+NTPG+'" and css="tbody"';
            new YQL.exec(yql_url, function(res) {
              //爬詳情
            });
        }
    }
});

//台北市政府   馬的不能爬

//台中市政府(TCG)
var parserTCG = 'http://www.society.taichung.gov.tw/section/index.asp?Parser=99,16,257,,,,,,,,'+1+',8,,4';

new YQL.exec('select * from data.html.cssselect where url="http://www.sw.ntpc.gov.tw/_file/1588/SG/24725/D.html" and css=".dlarktext-13"', function(response) {
    
});

//基隆市政府（KLG)
new YQL.exec('select * from data.html.cssselect where url="http://exlaw.klcg.gov.tw/SearchAllResultList.aspx?KeyWord=%E8%BA%AB%E5%BF%83%E9%9A%9C%E7%A4%99&Cur=L" and css="body"', function(response) {
    
});

//新竹市政府(HCG)

new YQL.exec('select * from data.html.cssselect where url="http://society.hccg.gov.tw/web/SelfPageSetup?command=display&pageID=22305&FP=39122" and css="body"', function(response) {
    
});

//台南市政府(TNG)
new YQL.exec('select * from data.html.cssselect where url="http://social.tncg.gov.tw/social/socpage.asp?nsub=C0A300" and css="body"', function(response) {
    
});

//南投縣政府(NTG)
new YQL.exec('select * from data.html.cssselect where url="http://www.nantou.gov.tw/big5/download.asp?dptid=376480000AU130000&catetype=01&cid=957" and css="body"', function(response) {
    
});

//桃園縣  （行政規則）
new YQL.exec('select * from data.html.cssselect where url="http://www.tycg.gov.tw/ch/home.jsp?id=15&parentpath=0,1,12&mcustomize=law_list.jsp" and css="body"', function(response) {
    
});
//桃園縣   （自治規則）
new YQL.exec('select * from data.html.cssselect where url="http://law.tycg.gov.tw/SearchAllResultList.aspx?KeyWord=%E8%BA%AB%E5%BF%83%E9%9A%9C%E7%A4%99&Cur=L" and css="body"', function(response) {
    console.log('ya');
});



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
