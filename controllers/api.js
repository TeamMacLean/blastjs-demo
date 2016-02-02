var blast = require('blastjs');
var fs = require('fs');
var path = require('path');
var api = {};

var dbRoot = './dbs';

api.getDBs = function (req, res) {
  fs.readdir(dbRoot, function (err, files) {
    var dbs = [];
    if (err) {
      return res.status(500).json({error: err});
    }
    files.map(function (file) {
      var pin = file.indexOf('.pin');
      var nin = file.indexOf('.nin');
      if (pin > -1) {
        dbs.push({name: file.split('.pin')[0], type: 'pin'});
      }
      if (nin > -1) {
        dbs.push({name: file.split('.nin')[0], type: 'nin'});
      }
    });
    return res.json({dbs: dbs})
  })
};

api.blast = function (req, res) {

  if (req.body) {

    console.log(req.body);

    var query = req.body.query;
    var db = req.body.db;

    if (req.body.useString) {
      blast.outputString(true);
    }

    if (query && query.length > 0) {
      if (db && db.name && db.type) {

        var dbPath = path.join(dbRoot, db.name);

        if (db.type == 'pin') {
          blast.blastP(dbPath, query, function (err, output) {
            if (err) {
              return res.json({error: err});
            } else {
              return res.json({output: output});
            }
          })
        } else {
          blast.blastN(dbPath, query, function (err, output) {
            if (err) {
              return res.json({output: output});
            } else {

            }
          })
        }


      } else {
        return res.json({error: 'did not receive any dbs'});
      }
    } else {
      return res.json({error: 'did not receive query'});
    }
  } else {
    return res.json({error: 'did not receive body'});
  }
};

module.exports = api;