var express = require('express'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  multer  = require('multer'),
  customerRoute = require('./routes/customer.js');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var multerSigle = multer({ dest: './pictures/'}).single('avatar');

//enable PUT and DELETE
app.use(methodOverride('_method'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

//base route
app.get('/', function (req, res) {
  res.render('index');
});

//customer route
app.get('/customer/blank', customerRoute.create);
app.get('/customer', customerRoute.list);
app.get('/customer/edit/:id', customerRoute.edit);
app.put('/customer/put/:id', multerSigle, customerRoute.put);
app.post('/customer/post', multerSigle, customerRoute.post);
app.delete('/customer/delete/:id', customerRoute.remove);

app.get('/pictures/delete/:id', customerRoute.remove);

var port = 4000;
app.listen(port);
console.log('Listening on port ' + port);