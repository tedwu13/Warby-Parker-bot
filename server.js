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
    'url': 'https://newsapi.org/v1/sources?language=en&country=us',
    'json': true
  }, function(err, response, body) {
    if (err) {
      console.log('Error:', err);
    } else if (response.statusCode != 200) {
      console.log('Status:', response.statusCode);
    } else {
      if (req.query.language) { 
        req.query.language = req.query.language.slice(0,2)
      };
      req.query.category = req.query.category.toLowerCase();;
      // since user attributes is Technology, General, etc, make it lowercase for the parameters

      // since language is en_US based on ISO 639-1, I have to slice the query
      var sources = _.filter(body.sources, req.query);

      var jsonElements = [];
      var maxSubtitleLength = 80; //max subtitle length
      var maxTitleLength = 40; // max title length
      var maxGalleryItems = 9; //max Gallery items length
      _.forEach(sources, function(source, id) {
        if (source.description.length > maxSubtitleLength) {
          source.description = source.description.substring(0, maxSubtitleLength);
        } 
        if (source.name.length > maxTitleLength) {
          source.name = source.name.substring(0, maxTitleLength);
        }
        var finalSource = {
          "title": source.name,
          "image_url": "https://www.fortlewis.edu/portals/165/icons/news-features.png",
          "subtitle": source.description,
          "buttons": [
            {
              "type":"web_url",
              "url": source.url,
              "title":"Go to URL"
            },
          ]
        }
        jsonElements.push(finalSource);
      });

      var elements = jsonElements.length <= maxGalleryItems ? jsonElements : _.slice(jsonElements, 0, maxGalleryItems);

      if (elements.length > 0) {
        res.json({
          "messages": [
              {
                "attachment":{
                  "type":"template",
                  "payload":{
                    "template_type":"generic",
                    "elements": elements
                  }
                }
              }
            ]
        });
      }
      else {
        res.json({
         "messages": [
           {"text": "Sorry I don't have any results for you"},
         ]
        });

      }
      // res.json({
      //   "messages": [
      //      {
      //        "attachment":{
      //          "type":"template",
      //          "payload":{
      //            "template_type":"generic",
      //            "elements":[
      //              {
      //                "title":"Classic White T-Shirt",
      //                "image_url":"http://petersapparel.parseapp.com/img/item100-thumb.png",
      //                "subtitle":"Soft white cotton t-shirt is back in style",
      //                "buttons":[
      //                  {
      //                    "type":"web_url",
      //                    "url":"https://petersapparel.parseapp.com/view_item?item_id=100",
      //                    "title":"View Item"
      //                  },
      //                  {
      //                    "type":"web_url",
      //                    "url":"https://petersapparel.parseapp.com/buy_item?item_id=100",
      //                    "title":"Buy Item"
      //                  }
      //                ]
      //              },
      //              {
      //                "title":"Classic Grey T-Shirt",
      //                "image_url":"http://petersapparel.parseapp.com/img/item101-thumb.png",
      //                "subtitle":"Soft gray cotton t-shirt is back in style",
      //                "buttons":[
      //                  {
      //                    "type":"web_url",
      //                    "url":"https://petersapparel.parseapp.com/view_item?item_id=101",
      //                    "title":"View Item"
      //                  },
      //                  {
      //                    "type":"web_url",
      //                    "url":"https://petersapparel.parseapp.com/buy_item?item_id=101",
      //                    "title":"Buy Item"
      //                  }
      //                ]
      //              }
      //            ]
      //          }
      //        }
      //      }
      //    ]
      //  });
    }
  });
});

var port = process.env.PORT || 8080;
app.listen(port);
console.log("App listening on port " + port);
