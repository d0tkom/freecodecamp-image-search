var express = require('express');
var app = express();
var request = require('request');

var pastSearches = new Array();


app.get('/api/imagesearch/:term', function (req, res) {
    var searchStr = req.params.term;
    var offset = req.param('offset');
    
    request('https://pixabay.com/api/?key=<APIKEY>&q=' + searchStr + '&image_type=photo&pretty=true&page=' + offset, function (error, response, body) {
        var result = JSON.parse(body).hits;
        pastSearches.unshift({term: searchStr, when: new Date()});
        res.json(result);
    });
})

app.get('/api/latest/imagesearch', function(req, res) {
    res.json(pastSearches);
})

app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening on port 8080!')
})