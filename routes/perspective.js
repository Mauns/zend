var express = require('express');
var router = express.Router();

app.get('/perspective', function(req, res, next) {
  res.send('perspective');
});

module.exports = router;
