/**
 * Created by Thomas on 13.06.14.
 */

var express = require('express');
var router = express.Router();
var parameter = require('../parameter');
var admin = require('./admin');
var config = require('../config');

router.param('keyidx', parameter.keyidx);

router.get('/:keyidx', function(req, res) {

  var session = req.session;
  var malicious = admin.isIndexMalicious(req.keyidx);

  var letter;
  if (req.keyidx !== undefined) {
    letter = admin.getLetter(req.keyidx);
  }

  var date = new Date();
  console.log(date.getHours() + ":"  + date.getMinutes() +
    ": an URL was opened; malicious=" + admin.isIndexMalicious(req.keyidx));

  addToLog(session, req.keyidx, letter, malicious);

  res.render('scan', {
    title: 'QR Puzzle',
    letter: letter,
    keyidx: req.keyidx,
    views: session.views,
    log: session.log,
    malicious: malicious,
    length: admin.secrets[config.activeIndex].key.length
  });
});



function addToLog(session, keyidx, letter, malicious) {

  // increase the view counter
  if (session.views) {
    session.views++;
  } else {
    session.views = 1;
  }

  // save the scanned data
  if (session.log) {
    session.log.push({
      num: session.views,
      keyidx: keyidx,
      time: new Date(),
      letter: letter,
      malicious: malicious,
      activeIndex: config.activeIndex
    });
  } else {
    session.log = [{
      num: session.views,
      keyidx: keyidx,
      time: new Date(),
      letter: letter,
      malicious: malicious,
      activeIndex: config.activeIndex
    }];
  }
}

module.exports = router;
