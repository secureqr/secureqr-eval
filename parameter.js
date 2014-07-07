/**
 * Created by Thomas on 13.06.14.
 */

var crypto = require('crypto');

exports.keyidx = function(req, res, next, keyidx) {
  var numberRegex = /\d+/;

  if (keyidx.match(numberRegex)) {
    // console.log("the parameter is a number");

    // check to which index the path refers
    for (var i = 0; i < 25; i++) {
      // we don't need collision resistance
      var hash = crypto.createHash('md5').update(i + "").digest('hex').slice(0,5);

      // console.log("#" + i + ": " + hash);

      if (hash === keyidx) {
        // console.log("found a match; the path refers to index " + i);
        req.keyidx = i;
        break;
      }
    }
  }

  next();

};