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

router.get('/seeList', function(req, res) {
    console.log('/seeList get url hit');
    var listFromDB = [];
    pool.connect(function(err, connection, done) {
        if (err) {
            console.log('error connection to the server');
            done();
            res.send(400);
        }//end err if
        else {
            console.log('connected to db');
            var resultSet = connection.query('SELECT * FROM to_do_list_table');
            resultSet.on('row', function(row) {
                listFromDB.push(row);
            });//end result.on
            resultSet.on('end', function() {
                done();
                res.send(listFromDB);
            });//end of end

        }// end elseif
    });//end pool connect


});//emd '/seeList'

module.exports = router;
