

var getJSONdataArr = []; 
//高雄市政府
// new YQL.exec('select * from data.html.cssselect where url="http://socbu.kcg.gov.tw/?prog=1&b_id=5" and css=".content"', function(response) {
//     for (var j = 0, div1 = response.query.results.results.div[0].table.tr.length; j < div1; j++){
//         for (var i = 0, div2 = response.query.results.results.div[0].table.tr[0].td.length; i < div2; i++){
//             //console.log(response.query.results.results.div[0].table.tr[j].td[i].a.href);
//             var dataurl = response.query.results.results.div[0].table.tr[j].td[i].a.href;
//             var datatitle = response.query.results.results.div[0].table.tr[j].td[i].a.title;
//             var ksg = 'http://socbu.kcg.gov.tw/';
//             ksg += response.query.results.results.div[0].table.tr[j].td[i].a.href;
//             //console.log(ksg)
//             var yql_url = 'select * from data.html.cssselect where url="'+ksg+'" and css=".content"';
//             new YQL.exec(yql_url, function(res) {
//               if (res.query.results.results != null){
//                 var getJSONdata = {},
//                     //check = 0,
//                     datacontent = [];
//                 datacontent.push(res.query.results.results.div);
//                 // console.log ('詳情'+getJSONdata.content);
//                 getJSONdata.category = '身心障礙' ;
//                 getJSONdata.url = ksg ;
//                 getJSONdata.title = datatitle;
//                 getJSONdata.content = datacontent;
//                 getJSONdataArr.push(getJSONdata);
//               }
//               else{
//                 writedata(getJSONdataArr);
//               }
//             });
//             //console.log(response.query.results.results.div[0].table.tr[j].td[i].a.title);
//             //console.log(response.query.results.results.div[0].table.tr[j].td[i].a.content);
//         }
//     };
//     //抓資料
//     //console.log('yoyo:'+JSON.stringify(getJSONdataArr));
// });

// new YQL.exec('select * from data.html.cssselect where url="http://socbu.kcg.gov.tw/?prog=1&b_id=5" and css=".content"', function(response) {
//     for (var j = 0, div1 = 8; j < div1; j++){
//         for (var i = 0, div2 = 2; i < div2; i++){
//             var dataurl = response.query.results.results.div[1].table.tr[j].td[i].a.href;
//             var datatitle = response.query.results.results.div[1].table.tr[j].td[i].a.title;
//             var ksg = 'http://socbu.kcg.gov.tw/';
//             ksg += response.query.results.results.div[1].table.tr[j].td[i].a.href;

//             var getJSONdata = {};
//                     //check = 0,
                
//                 // console.log ('詳情'+getJSONdata.content);
//                 getJSONdata.category = '身心障礙' ;
//                 getJSONdata.url = ksg ;
//                 getJSONdata.title = datatitle;
//                 getJSONdataArr.push(getJSONdata);
//                 if(j==7 && i == 1){
//                   writedata1()
//                 }
//             // //console.log(ksg)
//             // var yql_url = 'select * from data.html.cssselect where url="'+ksg+'" and css=".content"';
//             // new YQL.exec(yql_url, function(res) {

//             //     var getJSONdata = {},
//             //         //check = 0,
//             //         datacontent = [];
//             //     datacontent.push(res.query.results.results.div);
//             //     // console.log ('詳情'+getJSONdata.content);
//             //     getJSONdata.category = '身心障礙' ;
//             //     getJSONdata.url = ksg ;
//             //     getJSONdata.title = datatitle;
//             //     getJSONdata.content = datacontent;
//             //     //console.log(getJSONdata);
//             //     getJSONdataArr.push(getJSONdata);
//             //     console.log(getJSONdata);
//           //     var datacontent = [];
//           //     datacontent.push(res.query.results.results.div);

//           // });
//             //console.log(response.query.results.results.div[0].table.tr[j].td[i].a.title);
//             //console.log(response.query.results.results.div[0].table.tr[j].td[i].a.content);
//         }
//     };

//     //抓資料
//     //console.log('yoyo:'+JSON.stringify(getJSONdataArr));
// });
// new YQL.exec('select * from data.html.cssselect where url="http://socbu.kcg.gov.tw/?prog=1&b_id=5" and css=".content"', function(response) {
//     for (var j = 0, div1 = 3; j < div1; j++){
//         for (var i = 0, div2 = 2; i < div2; i++){
//             var dataurl = response.query.results.results.div[2].table.tr[j].td[i].a.href;
//             var datatitle = response.query.results.results.div[2].table.tr[j].td[i].a.title;
//             var ksg = 'http://socbu.kcg.gov.tw/';
//             ksg += response.query.results.results.div[2].table.tr[j].td[i].a.href;

//             var getJSONdata = {};
//                     //check = 0,
                
//                 // console.log ('詳情'+getJSONdata.content);
//                 getJSONdata.category = '身心障礙' ;
//                 getJSONdata.url = ksg ;
//                 getJSONdata.title = datatitle;
//                 getJSONdataArr.push(getJSONdata);
//                 if(j==2 && i == 1){
//                   writedata2()
//                 }
//             // //console.log(ksg)
//             // var yql_url = 'select * from data.html.cssselect where url="'+ksg+'" and css=".content"';
//             // new YQL.exec(yql_url, function(res) {

//             //     var getJSONdata = {},
//             //         //check = 0,
//             //         datacontent = [];
//             //     datacontent.push(res.query.results.results.div);
//             //     // console.log ('詳情'+getJSONdata.content);
//             //     getJSONdata.category = '身心障礙' ;
//             //     getJSONdata.url = ksg ;
//             //     getJSONdata.title = datatitle;
//             //     getJSONdata.content = datacontent;
//             //     //console.log(getJSONdata);
//             //     getJSONdataArr.push(getJSONdata);
//             //     console.log(getJSONdata);
//           //     var datacontent = [];
//           //     datacontent.push(res.query.results.results.div);

//           // });
//             //console.log(response.query.results.results.div[0].table.tr[j].td[i].a.title);
//             //console.log(response.query.results.results.div[0].table.tr[j].td[i].a.content);
//         }
//     };

//     //抓資料
//     //console.log('yoyo:'+JSON.stringify(getJSONdataArr));
// });
new YQL.exec('select * from data.html.cssselect where url="http://socbu.kcg.gov.tw/?prog=1&b_id=5" and css=".content"', function(response) {
    for (var j = 0, div1 = 1; j < div1; j++){
        for (var i = 0, div2 = 2; i < div2; i++){
            var dataurl = response.query.results.results.div[3].table.tr[j].td[i].a.href;
            var datatitle = response.query.results.results.div[3].table.tr[j].td[i].a.title;
            var ksg = 'http://socbu.kcg.gov.tw/';
            ksg += response.query.results.results.div[3].table.tr[j].td[i].a.href;

            var getJSONdata = {};
                    //check = 0,
                
                // console.log ('詳情'+getJSONdata.content);
                getJSONdata.category = '身心障礙' ;
                getJSONdata.url = ksg ;
                getJSONdata.title = datatitle;
                getJSONdataArr.push(getJSONdata);
                if(j==0 && i == 1){
                  writedata3()
                }
            // //console.log(ksg)
            // var yql_url = 'select * from data.html.cssselect where url="'+ksg+'" and css=".content"';
            // new YQL.exec(yql_url, function(res) {

            //     var getJSONdata = {},
            //         //check = 0,
            //         datacontent = [];
            //     datacontent.push(res.query.results.results.div);
            //     // console.log ('詳情'+getJSONdata.content);
            //     getJSONdata.category = '身心障礙' ;
            //     getJSONdata.url = ksg ;
            //     getJSONdata.title = datatitle;
            //     getJSONdata.content = datacontent;
            //     //console.log(getJSONdata);
            //     getJSONdataArr.push(getJSONdata);
            //     console.log(getJSONdata);
          //     var datacontent = [];
          //     datacontent.push(res.query.results.results.div);

          // });
            //console.log(response.query.results.results.div[0].table.tr[j].td[i].a.title);
            //console.log(response.query.results.results.div[0].table.tr[j].td[i].a.content);
        }
    };

    //抓資料
    //console.log('yoyo:'+JSON.stringify(getJSONdataArr));
});
new YQL.exec('select * from data.html.cssselect where url="http://socbu.kcg.gov.tw/?prog=1&b_id=5" and css=".content"', function(response) {
    for (var j = 0, div1 = 2; j < div1; j++){
        for (var i = 0, div2 = 2; i < div2; i++){
            var dataurl = response.query.results.results.div[4].table.tr[j].td[i].a.href;
            var datatitle = response.query.results.results.div[4].table.tr[j].td[i].a.title;
            var ksg = 'http://socbu.kcg.gov.tw/';
            ksg += response.query.results.results.div[4].table.tr[j].td[i].a.href;

            var getJSONdata = {};
                    //check = 0,
                
                // console.log ('詳情'+getJSONdata.content);
                getJSONdata.category = '身心障礙' ;
                getJSONdata.url = ksg ;
                getJSONdata.title = datatitle;
                getJSONdataArr.push(getJSONdata);
                if(j==1 && i == 1){
                  writedata4()
                }
            // //console.log(ksg)
            // var yql_url = 'select * from data.html.cssselect where url="'+ksg+'" and css=".content"';
            // new YQL.exec(yql_url, function(res) {

            //     var getJSONdata = {},
            //         //check = 0,
            //         datacontent = [];
            //     datacontent.push(res.query.results.results.div);
            //     // console.log ('詳情'+getJSONdata.content);
            //     getJSONdata.category = '身心障礙' ;
            //     getJSONdata.url = ksg ;
            //     getJSONdata.title = datatitle;
            //     getJSONdata.content = datacontent;
            //     //console.log(getJSONdata);
            //     getJSONdataArr.push(getJSONdata);
            //     console.log(getJSONdata);
          //     var datacontent = [];
          //     datacontent.push(res.query.results.results.div);

          // });
            //console.log(response.query.results.results.div[0].table.tr[j].td[i].a.title);
            //console.log(response.query.results.results.div[0].table.tr[j].td[i].a.content);
        }
    };

    //抓資料
    //console.log('yoyo:'+JSON.stringify(getJSONdataArr));
});
new YQL.exec('select * from data.html.cssselect where url="http://socbu.kcg.gov.tw/?prog=1&b_id=5" and css=".content"', function(response) {
    for (var j = 0, div1 = 1; j < div1; j++){
        for (var i = 0, div2 = 2; i < div2; i++){
            var dataurl = response.query.results.results.div[5].table.tr[j].td[i].a.href;
            var datatitle = response.query.results.results.div[5].table.tr[j].td[i].a.title;
            var ksg = 'http://socbu.kcg.gov.tw/';
            ksg += response.query.results.results.div[5].table.tr[j].td[i].a.href;

            var getJSONdata = {};
                    //check = 0,
                
                // console.log ('詳情'+getJSONdata.content);
                getJSONdata.category = '身心障礙' ;
                getJSONdata.url = ksg ;
                getJSONdata.title = datatitle;
                getJSONdataArr.push(getJSONdata);
                if(j==0 && i == 1){
                  writedata5()
                }
            // //console.log(ksg)
            // var yql_url = 'select * from data.html.cssselect where url="'+ksg+'" and css=".content"';
            // new YQL.exec(yql_url, function(res) {

            //     var getJSONdata = {},
            //         //check = 0,
            //         datacontent = [];
            //     datacontent.push(res.query.results.results.div);
            //     // console.log ('詳情'+getJSONdata.content);
            //     getJSONdata.category = '身心障礙' ;
            //     getJSONdata.url = ksg ;
            //     getJSONdata.title = datatitle;
            //     getJSONdata.content = datacontent;
            //     //console.log(getJSONdata);
            //     getJSONdataArr.push(getJSONdata);
            //     console.log(getJSONdata);
          //     var datacontent = [];
          //     datacontent.push(res.query.results.results.div);

          // });
            //console.log(response.query.results.results.div[0].table.tr[j].td[i].a.title);
            //console.log(response.query.results.results.div[0].table.tr[j].td[i].a.content);
        }
    };

    //抓資料
    //console.log('yoyo:'+JSON.stringify(getJSONdataArr));
});
function writedata5(){
      ls.setItem('myKey', JSON.stringify(getJSONdataArr));
      getKG6 = ls.getItem('myKey');
      fs.writeFile('./data/structural_data/KSG/data5.json',getKG6, function (err) {
    if (err) throw err;
    console.log('KSG 身心障礙5 saved!');
  });
}
function writedata4(){
      ls.setItem('myKey', JSON.stringify(getJSONdataArr));
      getKG5 = ls.getItem('myKey');
      fs.writeFile('./data/structural_data/KSG/data4.json',getKG5, function (err) {
    if (err) throw err;
    console.log('KSG 身心障礙4 saved!');
  });
}
function writedata3(){
      ls.setItem('myKey', JSON.stringify(getJSONdataArr));
      getKG4 = ls.getItem('myKey');
      fs.writeFile('./data/structural_data/KSG/data3.json',getKG4, function (err) {
    if (err) throw err;
    console.log('KSG 身心障礙3 saved!');
  });
}
function writedata2(){
      ls.setItem('myKey', JSON.stringify(getJSONdataArr));
      getKG3 = ls.getItem('myKey');
      fs.writeFile('./data/structural_data/KSG/data2.json',getKG3, function (err) {
    if (err) throw err;
    console.log('KSG 身心障礙2 saved!');
  });
}
function writedata1(){
      ls.setItem('myKey', JSON.stringify(getJSONdataArr));
      getKG2 = ls.getItem('myKey');
      fs.writeFile('./data/structural_data/KSG/data1.json',getKG2, function (err) {
    if (err) throw err;
    console.log('KSG 身心障礙1 saved!');
  });
}

function writedata(getJSONdataArr){
      fs.writeFile('./data/structural_data/KSG/data.json',JSON.stringify(getJSONdataArr), function (err) {
    if (err) throw err;
    console.log('KSG 身心障礙 saved!');
  });
}



new YQL.exec('select * from data.html.cssselect where url="http://socbu.kcg.gov.tw/?prog=1&b_id=2" and css=".content td a"', function(response) {
    
  //response.query.results.results.a.category = '兒童及少年福利法';
  console.log(response.query.results.results.a);
  fs.writeFile('./data/structural_data/KSG/兒童及少年福利法.json',JSON.stringify(response.query.results.results.a), function (err) {
    if (err) throw err;
    console.log('KSG 兒童及少年福利法 saved!');
  });

});

new YQL.exec('select * from data.html.cssselect where url="http://socbu.kcg.gov.tw/?prog=1&b_id=25" and css=".content td a"', function(response) {
    

  console.log(response.query.results.results.a);
  fs.writeFile('./data/structural_data/KSG/托育福利.json',JSON.stringify(response.query.results.results.a), function (err) {
    if (err) throw err;
    console.log('KSG 托育福利 saved!');
  });

});

new YQL.exec('select * from data.html.cssselect where url="http://socbu.kcg.gov.tw/?prog=1&b_id=4" and css=".content td a"', function(response) {
    

  console.log(response.query.results.results.a);
  fs.writeFile('./data/structural_data/KSG/老人福利.json',JSON.stringify(response.query.results.results.a), function (err) {
    if (err) throw err;
    console.log('KSG 老人福利 saved!');
  });

});

new YQL.exec('select * from data.html.cssselect where url="http://socbu.kcg.gov.tw/?prog=1&b_id=6" and css=".content td a"', function(response) {
    

  console.log(response.query.results.results.a);
  fs.writeFile('./data/structural_data/KSG/社會救助.json',JSON.stringify(response.query.results.results.a), function (err) {
    if (err) throw err;
    console.log('KSG 社會救助 saved!');
  });

});

new YQL.exec('select * from data.html.cssselect where url="http://socbu.kcg.gov.tw/?prog=1&b_id=3" and css=".content td a"', function(response) {
    

  console.log(response.query.results.results.a);
  fs.writeFile('./data/structural_data/KSG/婦女福利.json',JSON.stringify(response.query.results.results.a), function (err) {
    if (err) throw err;
    console.log('KSG 婦女福利 saved!');
  });

});

new YQL.exec('select * from data.html.cssselect where url="http://socbu.kcg.gov.tw/?prog=1&b_id=25" and css=".content td a"', function(response) {
    

  console.log(response.query.results.results.a);
  fs.writeFile('./data/structural_data/KSG/兒童及少年福利法.json',JSON.stringify(response.query.results.results.a), function (err) {
    if (err) throw err;
    console.log('KSG 托育福利 saved!');
  });

});

new YQL.exec('select * from data.html.cssselect where url="http://socbu.kcg.gov.tw/?prog=1&b_id=7" and css=".content td a"', function(response) {
    

  console.log(response.query.results.results.a);
  fs.writeFile('./data/structural_data/KSG/單親及特境家庭福利.json',JSON.stringify(response.query.results.results.a), function (err) {
    if (err) throw err;
    console.log('KSG 單親及特境家庭福利 saved!');
  });

});


new YQL.exec('select * from data.html.cssselect where url="http://socbu.kcg.gov.tw/?prog=1&b_id=8" and css=".content td a"', function(response) {
    

  console.log(response.query.results.results.a);
  fs.writeFile('./data/structural_data/KSG/新移民家庭服務.json',JSON.stringify(response.query.results.results.a), function (err) {
    if (err) throw err;
    console.log('KSG 新移民家庭服務 saved!');
  });

});
new YQL.exec('select * from data.html.cssselect where url="http://socbu.kcg.gov.tw/?prog=1&b_id=11" and css=".content td a"', function(response) {
    

  console.log(response.query.results.results.a);
  fs.writeFile('./data/structural_data/KSG/家庭暴力及性侵害.json',JSON.stringify(response.query.results.results.a), function (err) {
    if (err) throw err;
    console.log('KSG 家庭暴力及性侵害 saved!');
  });

});
new YQL.exec('select * from data.html.cssselect where url="http://socbu.kcg.gov.tw/?prog=1&b_id=7" and css=".content td a"', function(response) {
    

  console.log(response.query.results.results.a);
  fs.writeFile('./data/structural_data/KSG/單親及特境家庭福利.json',JSON.stringify(response.query.results.results.a), function (err) {
    if (err) throw err;
    console.log('KSG 單親及特境家庭福利 saved!');
  });

});