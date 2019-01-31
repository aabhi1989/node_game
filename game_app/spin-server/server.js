//Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')

var app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//CORS
app.use(cors());

//Routes
app.use('/api', require('./routes/api'));

app.listen(3000);
console.log('API is running on PORT 3000');