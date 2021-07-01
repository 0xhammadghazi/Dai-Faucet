var DaiFaucet = artifacts.require("./DaiFaucet.sol");

module.exports = function (deployer) {
  deployer.deploy(DaiFaucet);
};
