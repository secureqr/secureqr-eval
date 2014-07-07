var express = require('express');
var router = express.Router();
var config = require('../config');
var basicAuth = require('basic-auth-connect');

var secrets = [
  {
    key: "Schokolade",
    maliciousIndex: [ 1, 4, 7 ]
  },
  {
    key: "SecureQR",
    maliciousIndex: [ 2, 5 ]
  },
  {
    key: "NodeJS",
    maliciousIndex: [ 0, 3 ]
  },
  {
    key: "Java",
    maliciousIndex: [ 3 ]
  },
  {
    key: "Shinjuku",
    maliciousIndex: [ 7 ]
  }
];

var auth = basicAuth(config.adminUser, config.adminPassword);

router.get('/', auth, function(req, res) {
  res.render('admin', {
    title: 'QR Puzzle Adminstration',
    secrets: secrets,
    activeIndex: config.activeIndex
  });
});

router.put('/activate/:id', auth, function(req, res) {
  var idx = req.params.id;

  if (idx < secrets.length) {
    config.activeIndex = idx;
    res.json({"successful" : true});
  } else {
    res.json({"successful" : false});
  }
});

var isIndexMalicious = function (keyidx) {
  var malicious = secrets[config.activeIndex].maliciousIndex;
  return malicious.indexOf(keyidx) !== -1;
}

var getLetter = function (keyidx) {
  var secret = secrets[config.activeIndex].key;
  var index = keyidx % secret.length;
  return secret[index];
}

exports.secrets = secrets;
exports.router = router;
exports.isIndexMalicious = isIndexMalicious;
exports.getLetter = getLetter;
