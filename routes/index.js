var express = require('express');
var router = express.Router();
var MetaCoinContract = require('../build/contracts/MetaCoin.json');
var Web3 = require('web3');
var contract = require('truffle-contract');
var MetaCoin = contract(MetaCoinContract);
var web3 = MetaCoin.web3;

MetaCoin.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

/* GET home page. */
router.get('/', function (req, res, next) {
    var metacoin;
    MetaCoin.deployed().then(function (instance) {
        metacoin = instance;
        return metacoin.sendCoin(web3.eth.accounts[1], 2, {from: web3.eth.accounts[0]});
    }).then(function (tx) {
        console.log(tx);
        return metacoin.getBalance.call(web3.eth.accounts[0]);
    }).then(function (result) {
        res.send(result);
    }).catch(function (err) {
        console.log(err);
    });
});

module.exports = router;
