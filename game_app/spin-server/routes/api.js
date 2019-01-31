//Dependencies
var express = require('express');
var Result = require('../models/result');

var router = express.Router();

//Return any random number between 0 to 5
router.get('/play', function(req, res){
    var first = Math.floor(Math.random() * 6) + 0;
    var second = Math.floor(Math.random() * 6) + 0;
    var third = Math.floor(Math.random() * 6) + 0;
    res.send(new Result(first, second, third));
});

//Return either true or false
router.get('/bonus', function(req, res){
    var bonus = Math.floor(Math.random() * 2) + 0; 
    res.send(bonus == 0 ? false : true);
});

//Return
module.exports = router;