var express = require('express'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  customerRoute = require('./routes/customer.js');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/customer', customerRoute.list);
app.get('/customer/blank', customerRoute.create);
app.get('/customer/edit/:id', customerRoute.edit);
app.post('/customer/save/:id', customerRoute.save);
app.get('/customer/remove/:id', customerRoute.remove);

var port = 4000;
app.listen(port);
console.log('Listening on port ' + port);