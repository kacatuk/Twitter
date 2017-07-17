var request = require('request');
var config = require('./config');

functions = {

  authorize: function(req, res) {
    console.log('Try to do something');
    var header = config.consumerKey + ':' + config.consumerSecret;
    var encheader = new Buffer(header).toString('base64');
    var finalHeader = 'Basic ' + encheader;
    console.log(finalHeader);
    request.post('https://api.twitter.com/oauth2/token', {form: {'grant_type': 'client_credentials'}, headers: {Authorization: finalHeader}}, function (error, response, body) {
      console.log('Passed to post par');
      if (error) {
        console.log('Error caught');
        console.log(error);
      }
      else{
        console.log('I got body');
        console.log(body);
        config.bearerToken = JSON.parse(body).access_token;
        res.json({success: true, data: config.bearerToken});
        console.log(res);
      }
    })
  },

  search: function (req, res) {
    console.log('Search began');
    var searchQuery = req.body.query;
    var encSearchQuery = encodeURIComponent(searchQuery);
    var bearerHeader = 'Bearer ' + config.bearerToken;

    request.get('https://api.twitter.com/1.1/search/searchTweets.json?q=' + encSearchQuery + '&result_type=recent&count=40', {headers: {Authorization: bearerHeader}},
    function (error, body, response) {
      if (error) {
        console.log(error);
      }else {
        res.json({ success: true, data: JSON.parse(body.body)});
      }
    });
  },
  user: function (req, res) {
    var searchQuery = req.body.screenname;
    var encSearchQuery = encodeURIComponent(searchQuery);
    var bearerHeader = 'Bearer ' + config.bearerToken;

    request.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=' + encSearchQuery + '&count=15', {headers: {Authorization: bearerHeader}},
      function (error, body, response) {
        if (error) {
          console.log(error);
        }else {
          res.json({ success: true, data: JSON.parse(body.body)});
        }
      });
  }
}

module.exports = functions;
