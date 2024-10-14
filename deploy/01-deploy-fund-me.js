const { network } = require('hardhat');
const {
  LOCK_TIME,
  DEVLOPMENT_CHAINS,
  NETWORK_CONFIG,
  CONFIRMATIONS
} = require('../helper-hardhat-config');

module.exports = async({ getNamedAccounts, deployments }) => {
  const { firstAccount } = await getNamedAccounts();
  const { deploy } = deployments;

  let dataFeedAddr;
  let confirmations = 0;

  if (DEVLOPMENT_CHAINS.includes(network.name)) {
    dataFeedAddr = (await deployments.get('MockV3Aggregator')).address;
  } else {
    dataFeedAddr = NETWORK_CONFIG[network.config.chainId].ethUsdDataFeed;
    confirmations = CONFIRMATIONS;
  }
  
  // remove deployments directory or add --reset flag if you redeploy contract
  const fundMe = await deploy('FundMe', {
    from: firstAccount,
    args: [LOCK_TIME, dataFeedAddr],
    log: [true],
    waitConfirmations: confirmations // 避免在ethersscan获取到空合约
  });

  if (hre.network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    await hre.run("verify:verify", {
      address: fundMe.address,
      constructorArguments: [LOCK_TIME, dataFeedAddr]
    });
  };

};

module.exports.tags = ['all', 'fundme'];