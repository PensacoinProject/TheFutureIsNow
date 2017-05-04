var Token = artifacts.require("./Token.sol");
var TokenPurchase = artifacts.require("./TokenPurchase.sol");
var BigNumber = require('bignumber.js');

contract('Token', function(accounts) {
  it("should have some variables setup from the initialization", () => {
    var token;
    var purchase;
    const STARTTIME = 1496293200;
    const TOTALSUPPLY = 15000000000000000000000000; 
    const ONEDAY = 24 * 60 * 60;
    var totalTokens; 

    return Token.deployed().then(function(instance) {
      token = instance;
      return TokenPurchase.deployed();
    }).then(function(instance) {
      purchase = instance;
      return token.approve(purchase.address, 5000000000000000000000000);
    }).then(function(fx) {
      return purchase.setToken(token.address);
    }).then(function(fx) {
      return token.owner.call();
    }).then(function(owner) {
      assert.equal(owner, accounts[0], "The owner should be set to account 1");
      return purchase.owner.call();
    }).then(function(owner) {
      assert.equal(owner, accounts[0], "The owner should be set to account 1");
      return token.totalSupply.call();
    }).then(function(supply) {
      assert.equal(supply, TOTALSUPPLY, "The total supply should be 15M with 18 decimal places");
      return purchase.setNow(STARTTIME - ONEDAY);
    }).then(function() {
      return purchase.purchaseTokens({from: accounts[1], value: 1000000000000000000});
    }).catch(function(error) { if(error.toString().indexOf("invalid JUMP") != -1) { console.log("Got expected solidity throw. Test succeeded."); } else { assert(false, error.toString()); }
    }).then(function() {
      return purchase.setNow(STARTTIME + Math.round(ONEDAY*0));
    }).then(function() {
      return purchase.purchaseTokens.call({from: accounts[1], value: 1000000000000000000});
    }).then(function(current) {
      assert.equal(current.toNumber(), 100000000000000000000
);
      return purchase.purchaseTokens.call({from: accounts[1], value: 1500000000000000000});
    }).then(function(current) {
      assert.equal(current.toNumber(), 150000000000000000000
);
      return purchase.purchaseTokens.call({from: accounts[1], value: 3700000000000000000});
    }).then(function(current) {
      assert.equal(current.toNumber(), 370000000000000000000
);
      return purchase.setNow(STARTTIME + Math.round(ONEDAY*1));
    }).then(function() {
      return purchase.purchaseTokens.call({from: accounts[2], value: 1000000000000000000});
    }).then(function(current) {
      assert.equal(current.toNumber(), 100000000000000000000);
      return purchase.purchaseTokens.call({from: accounts[2], value: 1500000000000000000});
    }).then(function(current) {
      assert.equal(current.toNumber(), 150000000000000000000);
      return purchase.purchaseTokens.call({from: accounts[2], value: 3700000000000000000});
    }).then(function(current) {
      assert.equal(current.toNumber(), 370000000000000000000);
      return purchase.setNow(STARTTIME + Math.round(ONEDAY*7));
    }).then(function() {
      return purchase.purchaseTokens.call({from: accounts[2], value: 1000000000000000000});
    }).then(function(current) {
      assert.equal(current.toNumber(), 91954022988505740000
);
      return purchase.purchaseTokens.call({from: accounts[2], value: 1500000000000000000});
    }).then(function(current) {
      assert.equal(current.toNumber(), 137931034482758620000
);
      return purchase.purchaseTokens.call({from: accounts[2], value: 3700000000000000000});
    }).then(function(current) {
      assert.equal(current.toNumber(), 340229885057471300000
);
      return purchase.setNow(STARTTIME + Math.round(ONEDAY*8));
    }).then(function() {
      return purchase.purchaseTokens.call({from: accounts[3], value: 1000000000000000000});
    }).then(function(current) {
      assert.equal(current.toNumber(), 91954022988505740000);
      return purchase.purchaseTokens.call({from: accounts[3], value: 1500000000000000000});
    }).then(function(current) {
      assert.equal(current.toNumber(), 137931034482758620000);
      return purchase.purchaseTokens.call({from: accounts[3], value: 3700000000000000000});
    }).then(function(current) {
      assert.equal(current.toNumber(), 340229885057471300000);
      return purchase.setNow(STARTTIME + Math.round(ONEDAY*14));
    }).then(function() {
      return purchase.purchaseTokens.call({from: accounts[3], value: 1000000000000000000});
    }).then(function(current) {
      assert.equal(current.toNumber(), 88888888888888890000
);
      return purchase.purchaseTokens.call({from: accounts[3], value: 1500000000000000000});
    }).then(function(current) {
      assert.equal(current.toNumber(), 133333333333333330000
);
      return purchase.purchaseTokens.call({from: accounts[3], value: 3700000000000000000});
    }).then(function(current) {
      assert.equal(current.toNumber(), 328888888888888900000
);
      return purchase.setNow(STARTTIME + Math.round(ONEDAY*15));
    }).then(function() {
      return purchase.purchaseTokens.call({from: accounts[3], value: 1000000000000000000});
    }).then(function(current) {
      assert.equal(current.toNumber(), 88888888888888890000);
      return purchase.purchaseTokens.call({from: accounts[3], value: 1500000000000000000});
    }).then(function(current) {
      assert.equal(current.toNumber(), 133333333333333330000);
      return purchase.purchaseTokens.call({from: accounts[3], value: 3700000000000000000});
    }).then(function(current) {
      assert.equal(current.toNumber(), 328888888888888900000);
      return purchase.setNow(STARTTIME + Math.round(ONEDAY*21));
    }).then(function() {
      return purchase.purchaseTokens.call({from: accounts[1], value: 1000000000000000000});
    }).then(function(current) {
      assert.equal(current.toNumber(), 86021505376344080000
);
      return purchase.purchaseTokens.call({from: accounts[1], value: 1500000000000000000});
    }).then(function(current) {
      assert.equal(current.toNumber(), 129032258064516140000
);
      return purchase.purchaseTokens.call({from: accounts[1], value: 3700000000000000000});
    }).then(function(current) {
      assert.equal(current.toNumber(), 318279569892473100000
);
      return purchase.setNow(STARTTIME + Math.round(ONEDAY*22));
    }).then(function() {
      return purchase.purchaseTokens.call({from: accounts[1], value: 1000000000000000000});
    }).then(function(current) {
      assert.equal(current.toNumber(), 86021505376344080000);
      return purchase.purchaseTokens.call({from: accounts[1], value: 1500000000000000000});
    }).then(function(current) {
      assert.equal(current.toNumber(), 129032258064516140000);
      return purchase.purchaseTokens.call({from: accounts[1], value: 3700000000000000000});
    }).then(function(current) {
      assert.equal(current.toNumber(), 318279569892473100000);
      return web3.eth.sendTransaction({from: accounts[1], to: purchase.address, value: 1000000000000000000}); //using the fallback function
    }).then(function() {
      return web3.eth.sendTransaction({from: accounts[1], to: purchase.address, value: 1500000000000000000}); //using the fallback function
    }).then(function() {
      return web3.eth.sendTransaction({from: accounts[1], to: purchase.address, value: 3700000000000000000}); //using the fallback function
    }).then(function() {
      return purchase.setNow(STARTTIME + Math.round(ONEDAY*30));  // The ICO has ended, next call should fail
    }).then(function() {
      return purchase.purchaseTokens.call({from: accounts[1], value: 1000000000000000000});
    }).catch(function(error) { if(error.toString().indexOf("invalid JUMP") != -1) { console.log("Got expected solidity throw. Test succeeded."); } else { assert(false, error.toString()); }
    }).then(function(tx) {
      return token.balanceOf.call(accounts[1]);
    }).then(function(balance) {
      assert.equal(balance.toNumber(), 533333333333333320000);
      return token.balanceOf.call(accounts[0]);
    }).then(function(balance) {
      bn1 = new BigNumber(TOTALSUPPLY);
      bn2 = new BigNumber("533333333333333320000");
      assert.equal(balance.toNumber(), bn1.minus(bn2).toNumber());
    });
  });
});


