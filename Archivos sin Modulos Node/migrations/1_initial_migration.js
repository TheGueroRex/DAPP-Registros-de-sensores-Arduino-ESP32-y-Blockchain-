const SensorsContract = artifacts.require("SensorsContract");

module.exports = function (deployer) {
  deployer.deploy(SensorsContract);
};
