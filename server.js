var express = require('express');
var morgan  = require('morgan');
var request = require('request');

var app = express();
app.use(morgan('dev'));

app.get('/ethereum_price', function(req, res) {
  request.get({
    'url': 'https://api.coinbase.com/v2/prices/ETH-USD/spot',
    'json': true
  }, function(err, coinbase_res, data) {
    if (err) {
      console.log('Error:', err);
    } else if (coinbase_res.statusCode != 200) {
      console.log('Status:', res.statusCode);
    } else {
      var firstName = req.query.first_name;
      var price = data.data.amount;

      var message;
      if (firstName !== undefined && firstName !== "") {
        messageText = firstName + ', the current spot price of Ethereum on Coinbase is $' + price + '!';
      } else {
        messageText = 'The current spot price of Ethereum on Coinbase is $' + price + '!';
      }
      res.json({
        'messages': [
          { 'text': messageText }
        ]
      });
    }
  });
});

app.listen(8080);
console.log("App listening on port 8080");
