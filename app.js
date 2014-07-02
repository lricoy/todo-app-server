/* UTIL FUNCTIONS */
var _ = require('underscore');
var restful = require('node-restful');

/* EXPRESS LOADING */
var express = require('express');
var bodyParser = require('body-parser');

/* MONGOOSE LOADING AND CONFIGURATION */
var mongoose = require('mongoose');
mongoose.connect('mongodb://todo:todo@ds037617.mongolab.com:37617/todo');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Connection established with mongodb server');
});

/* EXPRESS CONFIGURATION */ 
var app = express();
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(express.query());

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
 });


/* RESOURCE CREATION */
var Resource = app.resource = restful.model('todos', mongoose.Schema({
	title: String,
	done: { type: Boolean, default: false },
	created_at: { type: Date, default: Date.now },
	completed_at: { type: Date }
  }))
  .methods(['get', 'post', 'put', 'delete']);

Resource.register(app, '/todos');


/* SERVER START */
var server = app.listen(3030, function() {
    console.log('Listening on port %d', server.address().port);
});