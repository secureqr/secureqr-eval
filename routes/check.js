/**
 * Created by Thomas on 13.06.14.
 */

var express = require('express');
var router = express.Router();
var parameter = require('../parameter');
var admin = require('./admin');

router.param('keyidx', parameter.keyidx);

router.get('/:keyidx', function(req, res) {
  var date = new Date();
  console.log(date.getHours() + ":"  + date.getMinutes() +
    ": an URL was checked; malicious=" + admin.isIndexMalicious(req.keyidx));

  res.json({malicious: admin.isIndexMalicious(req.keyidx)});
});

module.exports = router;
