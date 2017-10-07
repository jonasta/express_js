var express = require('express'),
    customerRoute = require('./routes/customer.js');

var app = express();
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/customer', customerRoute.index);
app.get('/customer/:id', customerRoute.edit);


app.listen(4000);