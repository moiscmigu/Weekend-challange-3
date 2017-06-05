var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var seeList = require("./modules/getInfo");
var post = require("./modules/insert");
var complete = require("./modules/complete");
var deleteTask = require("./modules/delete");
app.use( express.static( 'public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

//globals
var port = 9000;

app.listen(port, function(req, res) {
    console.log('Server up on port', port);
});//end listen

app.get('/', function(req, res) {
    console.log('Base url hit');
    res.sendFile(path.resolve('views/index.html'));
});//end of app '/'

app.get('/seeList', seeList);
app.post("/postInput", post);
app.post("/updateCompleted", complete);
app.post("/deleteTask", deleteTask);
