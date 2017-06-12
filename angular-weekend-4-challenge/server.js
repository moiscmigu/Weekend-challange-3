var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

//uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

//globals
var port = process.env.PORT || 8000;

app.listen(port, function() {
    console.log('Server up on port', port);
});//end listen

app.get('/', function(req, res) {
    console.log('Base url hit');

    res.sendFile(path.resolve('public/views/index.html'));
});//end base url
