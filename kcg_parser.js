var request = require('request'),
    fs   = require("fs"),
    cheerio = require('cheerio'),
    fs   = require("fs"),
    encode   = "utf8",
    filePath = "data/kcg.list";
 
//request('http://encosia.com', function(error, response, body) {
fs.readFile(filePath, encode, function(err, data) {
  if (err) throw err;
  // Hand the HTML response off to Cheerio and assign that to
  //  a local $ variable to provide familiar jQuery syntax.
  var $ = cheerio.load(data);
 
  // Exactly the same code that we used in the browser before:
  $('a').each(function() {
    console.log($(this).text());
    console.log($(this).attr('href'));
  });
});
