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

router.post('/updateCompleted', function(req, res) {
    console.log('/updateCompleted url hit');
    pool.connect(function(err, connection, done) {
        if (err) {
            console.log('error connection to the server');
            done();
            res.send(400);
        }//end err if
        else {
            console.log('connected to db');
            connection.query("UPDATE to_do_list_table SET completed = 'Y' WHERE task LIKE($1)", [req.body.div]);
            //connection.query("UPDATE to_do_list_table SET completed = 'Y' WHERE task LIKE '"+ req.body.div + "'");
            done();
            res.send(200);

        }// end elseif
    });//end pool.connec

});


module.exports = router;
