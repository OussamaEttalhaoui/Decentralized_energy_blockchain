const SimpleEnergyMarket = artifacts.require("SimpleEnergyMarket");

module.exports = function (deployer) {
  deployer.deploy(SimpleEnergyMarket);
};
