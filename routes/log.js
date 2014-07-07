/**
 * Created by Thomas on 13.06.14.
 */

var express = require('express');
var router = express.Router();
var admin = require('./admin');

router.get('/', function(req, res) {

  var session = req.session;

  res.render('log', {
    title: 'QR Puzzle Log',
    views: session.views,
    log: session.log,
    id: req.sessionID,
    secrets: admin.secrets
  });
});

module.exports = router;
