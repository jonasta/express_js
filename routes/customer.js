var db = require('./../db.js');


exports.list = function (req, res) {
  res.render('customer/customer_list', {title : "Customer List", customers : db.getAllCustomers()});
  };

exports.create = function (req, res) {
  res.render('customer/customer_new', {title : "New Customer", customer:{first_name : '', last_name: '', email: '', gender : ''}});
};

exports.edit = function (req, res) {
  var customer = db.getCustomerById(req.params.id);
  res.render('customer/customer_edit', {title : "Edit Customer", customer : customer});
};

exports.put = function (req, res) {
  console.log('REQ BODY : ' + req.body.email);
  db.saveCustomer(req.params.id, req.body);
  res.redirect('/customer');
}

exports.post = function (req, res) {
  console.log('REQ BODY : ' + req.body.email);
  db.saveCustomer(0, req.body);
  res.redirect('/customer');
}

exports.remove = function (req, res) {
  db.removeCustomer(req.params.id);
  res.redirect('/customer/');
}