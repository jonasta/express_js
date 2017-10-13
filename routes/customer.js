var db = require('./../db.js'),
  fs = require('fs');


exports.list = function (req, res) {
  res.render('customer/customer_list', {title: "Customer List", customers: db.getAllCustomers()});
};

exports.create = function (req, res) {
  res.render('customer/customer_new', {
    title: "New Customer",
    customer: {first_name: '', last_name: '', email: '', gender: ''}
  });
};

exports.edit = function (req, res) {
  var customer = db.getCustomerById(req.params.id);
  res.render('customer/customer_edit', {title: "Edit Customer", customer: customer});
};

exports.put = function (req, res) {
  console.log('REQ BODY : ' + req.body.email);
  console.dir(req.file);

  var tmp_path = req.file.path;
  var target_path = "./public/pictures/" + req.file.originalname;

  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);
  fs.unlinkSync(tmp_path);
  req.body.avatar = req.file.originalname;

  db.saveCustomer(req.params.id, req.body);
  res.redirect('/customer');
}

exports.post = function (req, res) {
  console.log('REQ BODY : ' + req.body.avatar);
  console.dir(req.file);

  var tmp_path = req.file.path;
  var target_path = "./public/pictures/" + req.file.originalname;

  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);
  req.body.avatar = req.file.originalname;


  db.saveCustomer(0, req.body);
  res.redirect('/customer');
}

exports.remove = function (req, res) {
  db.removeCustomer(req.params.id);
  res.redirect('/customer/');
}