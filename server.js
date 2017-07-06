var express = require('express');
var morgan  = require('morgan');
var request = require('request');
var _ = require('lodash');

var app = express();
app.use(morgan('dev'));

app.get('/', function(req, res) {
  res.json({});
});

app.get('/distance', function(req, res) {
  distance_dict = { 
    0: {
      address: "Shaw, Washington",
      image_url: "https://www.wgsn.com/blogs/wp-content/uploads/2013/04/WarbyParker1.jpg",
      url: "https://www.warbyparker.com/appointments/eye-exams/washington-dc/1924-8th-st-nw",
      lat: 38.916555,
      lon: -77.023282,
    },
    1: {
      address: "Gold Coast, Chicago",
      image_url: "https://www.wgsn.com/blogs/wp-content/uploads/2013/04/WarbyParker1.jpg",
      url: "https://www.warbyparker.com/appointments/eye-exams/chicago/gold-coast",
      lat: 43.061996,
      lon: -76.156309,
    },
    2: {
      address: "Armitage Avenue, Chicago",
      image_url: "https://www.wgsn.com/blogs/wp-content/uploads/2013/04/WarbyParker1.jpg",
      url: "https://www.warbyparker.com/appointments/eye-exams/chicago/851-w-armitage-ave",
      lat: 41.917999,
      lon: -87.650500,
    },
    3: {
      address: "Harber East, Baltimore",
      image_url: "https://www.wgsn.com/blogs/wp-content/uploads/2013/04/WarbyParker1.jpg",
      url: "https://www.warbyparker.com/appointments/eye-exams/baltimore/harbor-east",
      lat: 39.283076,
      lon: -76.600868,
    },
    4: {
      address: "Newbury St, Boston",
      image_url: "https://www.wgsn.com/blogs/wp-content/uploads/2013/04/WarbyParker1.jpg",
      url: "https://www.warbyparker.com/appointments/eye-exams/boston/83-newbury-st",
      lat: 42.351862,
      lon: -71.074962,
    },
    5: {
      address: "Woodward Ave, Detroit",
      image_url: "https://www.wgsn.com/blogs/wp-content/uploads/2013/04/WarbyParker1.jpg",
      url: "https://www.warbyparker.com/appointments/eye-exams/detroit/1449-woodward-ave",
      lat: 42.334671,
      lon: -83.049519,
    },
    6: {
      address: "Country Club Plaza, Kansas City",
      image_url: "https://www.wgsn.com/blogs/wp-content/uploads/2013/04/WarbyParker1.jpg",
      url: "https://www.warbyparker.com/appointments/eye-exams/kansas-city/country-club-plaza",
      lat: 39.041390, 
      lon: -94.590560,
    },
    7: {
      address: "Greene St, NY",
      image_url: "https://www.wgsn.com/blogs/wp-content/uploads/2013/04/WarbyParker1.jpg",
      url: "https://www.warbyparker.com/appointments/eye-exams/new-york/121-greene-st",
      lat: 40.725447,
      lon: -73.999264,
    },
    8: {
      address: "Lexington Ave, NY",
      image_url: "https://www.wgsn.com/blogs/wp-content/uploads/2013/04/WarbyParker1.jpg",
      url: "https://www.warbyparker.com/appointments/eye-exams/new-york/1209-lexington-ave",
      lat: 40.776713,
      lon: -73.957319,
    },
    9: {
      address: "New York City HQ and Showroom, NY",
      image_url: "https://www.wgsn.com/blogs/wp-content/uploads/2013/04/WarbyParker1.jpg",
      url: "https://www.warbyparker.com/appointments/eye-exams/new-york/161-avenue-of-americas",
      lat: 40.725753,
      lon: -74.004361,
    },
    10: {
      address: "Washington St. NY",
      image_url: "https://www.wgsn.com/blogs/wp-content/uploads/2013/04/WarbyParker1.jpg",
      url: "https://www.warbyparker.com/appointments/eye-exams/new-york/819-washington-st",
      lat: 40.739644,
      lon: -74.007834,
    },
    11: {
      address: "Walnut St, Philadelphia",
      image_url: "https://www.wgsn.com/blogs/wp-content/uploads/2013/04/WarbyParker1.jpg",
      url: "https://www.warbyparker.com/appointments/eye-exams/philadelphia/1523-walnut-st",
      lat: 39.949927,
      lon: -75.167005,
    }
  }

  var min = 1000000000000;
  var key;
  var min_array = [];

  var dist_array = Object.keys(distance_dict).forEach(function(key) {
    value = distance_dict[key];
    var req_lat = req.query.latitude;
    var req_lon = req.query.longitude;

    min_array.push(distance(req_lat, req_lon, value.lat, value.lon));
  });

  var min_index=min_array.indexOf(Math.min.apply(null,min_array));
  var closestEyeExam = distance_dict[min_index];
  res.json({
     "messages": [
        {
          "attachment":{
            "type":"template",
            "payload":{
              "template_type":"generic",
              "elements":[
                {
                  "title": closestEyeExam.address,
                  "image_url":closestEyeExam.image_url,
                  "subtitle":"Soft white cotton t-shirt is back in style",
                  "buttons":[
                    {
                      "type":"web_url",
                      "url":closestEyeExam.url,
                      "title":"Book Appointment"
                    },
                  ]
                },
              ]
            }
          }
        }
      ]
  });

});

function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}


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
    }
  });
});

var port = process.env.PORT || 8080;
app.listen(port);
console.log("App listening on port " + port);
