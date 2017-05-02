var Token = artifacts.require("./Token.sol");
var TokenPurchase = artifacts.require("./TokenPurchase.sol");

module.exports = function(deployer) {
  deployer.deploy(Token);
  deployer.deploy(TokenPurchase);
};
