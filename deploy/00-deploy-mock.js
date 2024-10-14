const { DECIMAL, INITIAL_ANSWER } = require('../helper-hardhat-config');
const { DEVLOPMENT_CHAINS } = require('../helper-hardhat-config');

module.exports = async({ getNamedAccounts, deployments }) => {
  if (DEVLOPMENT_CHAINS.includes(network.name)) {
    const { firstAccount } = await getNamedAccounts();
    const { deploy } = deployments;
    await deploy('MockV3Aggregator', {
      from: firstAccount,
      args: [DECIMAL, INITIAL_ANSWER],
      log: [true]
    });
  } else {
    console.log('Current environment is not local, mock contract deployment is skipped');
  }
};

module.exports.tags = ['all', 'mock'];