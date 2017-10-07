exports.index = function (req, res) {
    res.send('customer_index');
};

exports.create = function (req, res) {
  res.send('customer_create');
};

exports.edit = function (req, res) {
  res.send('customer_edit ' + req.query.id);
};