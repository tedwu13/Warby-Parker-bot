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

      // { id: 'time',
      //     name: 'Time',
      //     description: 'Breaking news and analysis from TIME.com. Politics, world news, photos, video, tech reviews, health, science and entertainment news.',
      //     url: 'http://time.com',
      //     category: 'general',
      //     language: 'en',
      //     country: 'us',
      //     urlsToLogos: { small: '', medium: '', large: '' },
      //     sortBysAvailable: [ 'top', 'latest' ] },
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

      res.json({
        "messages": [
            {
              "attachment":{
                "type":"template",
                "payload":{
                  "template_type":"generic",
                  "elements": jsonElements
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
