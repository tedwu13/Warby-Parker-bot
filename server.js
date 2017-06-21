var express = require('express');
var morgan  = require('morgan');
var request = require('request');
var _ = require('lodash');

var app = express();
app.use(morgan('dev'));

app.get('/', function(req, res) {
  res.json({});
});

app.get('/sources', function(req, res) {
  request.get({
    'url': 'https://newsapi.org/v1/sources',
    'json': true
  }, function(err, response, body) {
    if (err) {
      console.log('Error:', err);
    } else if (response.statusCode != 200) {
      console.log('Status:', response.statusCode);
    } else {
      var sources = _.filter(body.sources, req.query);
      console.log("leng diff", body.sources.length, sources.length);

      var jsonElements = [];
      _.forEach(sources, function(source, id) {
        var finalSource = {
          "title": source.name,
          "image_url": source.urlsToLogos.medium,
          "subtitle": source.description,
          "buttons": [
            {
              "type":"web_url",
              "url": source.url,
              "title":"Go to URL"
            },
          ]
        }
        jsonElements.push(finalSource)
      });

      // res.json({
      //   "messages": [
      //       {
      //         "attachment":{
      //           "type":"template",
      //           "payload":{
      //             "template_type":"generic",
      //             "elements": jsonElements
      //           }
      //         }
      //       }
      //     ]

      // });
      res.json({
        "messages": [
           {
             "attachment":{
               "type":"template",
               "payload":{
                 "template_type":"generic",
                 "elements":[
                   {
                     "title":"Classic White T-Shirt",
                     "image_url":"http://petersapparel.parseapp.com/img/item100-thumb.png",
                     "subtitle":"Soft white cotton t-shirt is back in style",
                     "buttons":[
                       {
                         "type":"web_url",
                         "url":"https://petersapparel.parseapp.com/view_item?item_id=100",
                         "title":"View Item"
                       },
                       {
                         "type":"web_url",
                         "url":"https://petersapparel.parseapp.com/buy_item?item_id=100",
                         "title":"Buy Item"
                       }
                     ]
                   },
                   {
                     "title":"Classic Grey T-Shirt",
                     "image_url":"http://petersapparel.parseapp.com/img/item101-thumb.png",
                     "subtitle":"Soft gray cotton t-shirt is back in style",
                     "buttons":[
                       {
                         "type":"web_url",
                         "url":"https://petersapparel.parseapp.com/view_item?item_id=101",
                         "title":"View Item"
                       },
                       {
                         "type":"web_url",
                         "url":"https://petersapparel.parseapp.com/buy_item?item_id=101",
                         "title":"Buy Item"
                       }
                     ]
                   }
                 ]
               }
             }
           }
         ]
       });
    }
  });
});

var port = process.env.PORT || 8080;
app.listen(port);
console.log("App listening on port " + port);
