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
      offersExam: true,
    },
    1: {
      address: "Gold Coast, Chicago",
      image_url: "https://www.wgsn.com/blogs/wp-content/uploads/2013/04/WarbyParker1.jpg",
      url: "https://www.warbyparker.com/appointments/eye-exams/chicago/gold-coast",
      lat: 43.061996,
      lon: -76.156309,
      offersExam: true,
    },
    2: {
      address: "Armitage Avenue, Chicago",
      image_url: "https://www.wgsn.com/blogs/wp-content/uploads/2013/04/WarbyParker1.jpg",
      url: "https://www.warbyparker.com/appointments/eye-exams/chicago/851-w-armitage-ave",
      lat: 41.917999,
      lon: -87.650500,
      offersExam: true,
    },
    3: {
      address: "Harber East, Baltimore",
      image_url: "https://www.wgsn.com/blogs/wp-content/uploads/2013/04/WarbyParker1.jpg",
      url: "https://www.warbyparker.com/appointments/eye-exams/baltimore/harbor-east",
      lat: 39.283076,
      lon: -76.600868,
      offersExam: true,
    },
    4: {
      address: "Newbury St, Boston",
      image_url: "https://www.wgsn.com/blogs/wp-content/uploads/2013/04/WarbyParker1.jpg",
      url: "https://www.warbyparker.com/appointments/eye-exams/boston/83-newbury-st",
      lat: 42.351862,
      lon: -71.074962,
      offersExam: true,
    },
    5: {
      address: "Woodward Ave, Detroit",
      image_url: "https://www.wgsn.com/blogs/wp-content/uploads/2013/04/WarbyParker1.jpg",
      url: "https://www.warbyparker.com/appointments/eye-exams/detroit/1449-woodward-ave",
      lat: 42.334671,
      lon: -83.049519,
      offersExam: true,
    },
    6: {
      address: "Country Club Plaza, Kansas City",
      image_url: "https://www.wgsn.com/blogs/wp-content/uploads/2013/04/WarbyParker1.jpg",
      url: "https://www.warbyparker.com/appointments/eye-exams/kansas-city/country-club-plaza",
      lat: 39.041390, 
      lon: -94.590560,
      offersExam: true,
    },
    7: {
      address: "Greene St, NY",
      image_url: "https://www.wgsn.com/blogs/wp-content/uploads/2013/04/WarbyParker1.jpg",
      url: "https://www.warbyparker.com/appointments/eye-exams/new-york/121-greene-st",
      lat: 40.725447,
      lon: -73.999264,
      offersExam: true,
    },
    8: {
      address: "Lexington Ave, NY",
      image_url: "https://www.wgsn.com/blogs/wp-content/uploads/2013/04/WarbyParker1.jpg",
      url: "https://www.warbyparker.com/appointments/eye-exams/new-york/1209-lexington-ave",
      lat: 40.776713,
      lon: -73.957319,
      offersExam: true,
    },
    9: {
      address: "New York City HQ and Showroom, NY",
      image_url: "https://www.wgsn.com/blogs/wp-content/uploads/2013/04/WarbyParker1.jpg",
      url: "https://www.warbyparker.com/appointments/eye-exams/new-york/161-avenue-of-americas",
      lat: 40.725753,
      lon: -74.004361,
      offersExam: true,
    },
    10: {
      address: "Washington St. NY",
      image_url: "https://www.wgsn.com/blogs/wp-content/uploads/2013/04/WarbyParker1.jpg",
      url: "https://www.warbyparker.com/appointments/eye-exams/new-york/819-washington-st",
      lat: 40.739644,
      lon: -74.007834,
      offersExam: true,
    },
    11: {
      address: "Walnut St, Philadelphia",
      image_url: "https://www.wgsn.com/blogs/wp-content/uploads/2013/04/WarbyParker1.jpg",
      url: "https://www.warbyparker.com/appointments/eye-exams/philadelphia/1523-walnut-st",
      lat: 39.949927,
      lon: -75.167005,
      offersExam: true,
    }
  }

  retail_store = {
      0: {
        address: "Birmingham, Alabama",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/birmingham/the-pizitz",
        lat: 47.507383,
        lon: -111.275191
      },
      1: {
        address: "Scottsdale, Arizona",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/scottsdale/scottsdale-quarter",
        lat: 33.624699,
        lon: -111.924139,
      },
      2: {
        address: "Berkeley, Fourth St",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/berkeley/1911-fourth-st",
        lat: 37.868443,
        lon: -122.300136,
      },
      3: {
        address: "Los Angeles, Glasshouse at Alchemy Works",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/los-angeles/alchemy-works",
        lat: 33.770521,
        lon: -118.18199,
      },
      4: {
        address: "Los Angeles, Abbot Kinney",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/los-angeles/1422-abbot-kinney-blvd",
        lat: 33.990247,
        lon: -118.465322,
      },
      5: {
        address: "Los Angeles, Hollywood",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/los-angeles/8300-sunset-blvd",
        lat: 34.095899,
        lon: -118.370974,
      },
      6: {
        address: "Newport Beach",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/newport-beach/map-room",
        lat: 33.618437,
        lon: -117.928123,
      },
      7: {
        address: "555 Ramona St, Palo Alto",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/palo-alto/555-ramona-st",
        lat: 37.444731,
        lon: -122.161300,
      },
      8: {
        address: "San Diego, UTC",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/san-diego/university-town-center",
        lat: 32.870694,
        lon: -117.211692,
      },
      9: {
        address: "Hayes Valley, San Francisco",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/san-francisco/357-hayes-st",
        lat: 37.776895,
        lon: -122.422289,
      },
      10: {
        address: "Santana Row, San Jose",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/san-jose/santana-row",
        lat: 37.322253,
        lon: -121.947219,
      },
      11: {
        address: "Warby Parker Green Room, West Hollywood",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/los-angeles/8618-melrose-ave",
        lat: 34.081862,
        lon: -118.380489,
      },
      12: {
        address: "Pearl St, Boulder",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/boulder/1949-pearl-st",
        lat: 40.020137,
        lon: -105.270004,
      },
      13: {
        address: "Georgetown, Washington",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/washington-dc/3225-m-street",
        lat: 40.024097,
        lon: -83.057183,
      },
      14: {
        address: "Wynwood, Miami",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/miami/215-nw-25th-st",
        lat: 26.158933,
        lon: -80.147589,
      },
      15: {
        address: "Showroom at Oxford Exchange",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/tampa/oxford-exchange",
        lat: 27.944949,
        lon: -82.464637,
      },
      16: {
        address: "Buckhead, Atlanta",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/atlanta/262-buckhead-ave-ne",
        lat: 33.838207,
        lon: -84.378710,
      },
      17: {
        address: "Westside Provisions, Atlanta",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/atlanta/westside-provisions",
        lat: 33.786710,
        lon: -84.412202,
      },
      18: {
        address: "Oakbrook Center, Oakbrook",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/illinois/oakbrook-center",
        lat: 41.849899,
        lon: -87.953707,
      },
      19: {
        address: "Oakbrook Center, Oakbrook",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/illinois/oakbrook-center",
        lat: 41.849899,
        lon: -87.953707,
      },
      20: {
        address: "Yorkdale, Toronto",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/toronto/yorkdale",
        lat: 43.725670,
        lon: -79.452168,
      },
      21: {
        address: "Queen Street West, Toronto",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/toronto/684-queen-st-w",
        lat: 39.839452,
        lon: -75.172543,
      },
      22: {
        address: "Lexington, The Summit at Fritz Farm",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/lexington/the-summit-at-fritz-farm",
        lat: 37.977669,
        lon: -84.527654,
      },
      23: {
        address: "New Orleans, Warby Parker Frame Studio",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/new-orleans/3964-magazine-st",
        lat: 29.920941,
        lon: -90.096674,
      },
      24: {
        address: "Bethesda, Bethesda Row",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/bethesda/bethesda-row",
        lat: 38.981040,
        lon: -77.096637,
      },
      25: {
        address: "Brooklyn, Bergen St.",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/new-york/55-bergen-st",
        lat: 40.687165,
        lon: -73.991067,
      },
      26: {
        address: "Grand Central, New York",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/new-york/grand-central",
        lat: 40.752726,
        lon: -73.977229,
      },
      27: {
        address: "Showroom at Shop Good, OK",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/oklahoma-city/shop-good",
        lat: 35.477271,
        lon: -97.512388,
      },
      28: {
        address: "Charlotte, Atherton Mill",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/charlotte/atherton-mill",
        lat: 35.209246,
        lon: -80.860701,
      },
      29: {
        address: "WP Do Good Arcade, Portland",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/portland/817-nw-23-ave",
        lat: 45.528683,
        lon: -122.698744,
      },
      30: {
        address: "Nashville HQ and Showroom",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/nashville/401-church-street",
        lat: 33.961495,
        lon: -84.550436,
      },
      31: {
        address: "Edgehill, Nashville",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/nashville/1207-villa-pl",
        lat: 35.481049,
        lon: -97.556777,
      },
      32: {
        address: "Domain Northside, Austin",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/austin/domain-northside",
        lat: 30.403008,
        lon: -97.720938,
      },
      33: {
        address: "South Congress, Austin",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/austin/1317-south-congress",
        lat: 30.250408,
        lon: -97.749054,
      },
      34: {
        address: "NorthPark Center, Dallas",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/dallas/northpark",
        lat: 32.868502,
        lon: -96.773512,
      },
      35: {
        address: "Warby Parker Classroom, Dallas",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/dallas/2008-n-henderson-ave",
        lat: 32.812472,
        lon: -96.775448,
      },
      36: {
        address: "Tysons Corner, Virginia",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/virginia/tysons-corner",
        lat: 38.916556,
        lon: -77.221404,
      },
      37: {
        address: "University Village, Seattle",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/seattle/university-village",
        lat: 47.663208,
        lon: -122.299142,
      },
      38: {
        address: "Warby Parker Writer's Block",
        image_url: "http://www.insidebusinessnyc.com/wp-content/uploads/2013/08/warbywash8.jpg",
        url: "https://www.warbyparker.com/retail/seattle/3501-fremont-ave-n",
        lat: 45.018715,
        lon: -93.295957
      }
    }

  var min = 1000000000000;
  var exam_array = [];
  var store_array = [];

  var eyeExamsStores = Object.keys(distance_dict).forEach(function(key) {
    value = distance_dict[key];
    var req_lat = req.query.latitude;
    var req_lon = req.query.longitude;

    exam_array.push(distance(req_lat, req_lon, value.lat, value.lon));
  });

  var retailStores = Object.keys(retail_store).forEach(function(key) {
    value = retail_store[key];
    var req_lat = req.query.latitude;
    var req_lon = req.query.longitude;

    store_array.push(distance(req_lat, req_lon, value.lat, value.lon));
  });

  var min_exam_distance = Math.min.apply(null,exam_array);
  var min_store_distance = Math.min.apply(null,store_array);

  if (min_exam_distance > 30) {
    var min_index=store_array.indexOf(min_store_distance);
    var closestRetail = retail_store[min_index];
    res.json({
       "messages": [
          {"text": "Sorry, your location is more than 30 miles away from the closest store that offers eye exam. Let me find you the closest retail store near you"},
          {
            "attachment":{
              "type":"template",
              "payload":{
                "template_type":"generic",
                "elements":[
                  {
                    "title": closestRetail.address,
                    "image_url":closestRetail.image_url,
                    "subtitle":"Find available slots for eye checkups",
                    "buttons":[
                      {
                        "type":"web_url",
                        "url":closestRetail.url,
                        "title":"Go to Retail Store"
                      },
                    ]
                  },
                ]
              }
            }
          }
        ]
    });
  } else {
    var min_index=exam_array.indexOf(min_exam_distance);
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
                    "subtitle":"Find available slots for eye checkups",
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
  }
  

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
