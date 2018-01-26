var express = require('express');
var router = express.Router();
var MetaCoin = require('../build/contracts/MetaCoin.json');
var Web3 = require('web3');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(MetaCoin);
});

module.exports = router;
