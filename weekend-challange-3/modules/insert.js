var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');

var config = {
    database:'to_do_list_db',
    host:'localhost',
    port:5432,
    max:50
};//end config

var pool = new pg.Pool(config);

router.post('/postInput', function(req, res) {
    pool.connect(function(err, connection, done) {
        if (err) {
            console.log('Something went wrong connecting to the server');
            done();
            res.send(400);
        }//end if
        else {
            console.log('connected to the db');
            connection.query("INSERT INTO to_do_list_table (task, completed) VALUES($1, $2)", [req.body.toDo, req.body.completed]);
            //connection.query("INSERT INTO to_do_list_table (task, completed) VALUES ('"+ req.body.toDo + "', '" +req.body.completed + "' )");
            done();
            res.send(200);
        }//end else
    });//end pool


});//end '/postInput'

module.exports = router;
