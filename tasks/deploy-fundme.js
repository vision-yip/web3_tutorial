const { task } = require('hardhat/config');

task('deploy-fundme', 'deploy with fundme contract').setAction(async(taskArgs, hre) => {
  // create factory
  const fundMeFactory = await ethers.getContractFactory('FundMe');
  console.log('contract deploying');
  // deploy contract from factory
  const fundMe = await fundMeFactory.deploy(10);
  await fundMe.waitForDeployment();
  console.log(`contract has been deployed successfuly, contract address is ${fundMe.target}`);

  // verifyFundMe
  if (hre.network.config.chainId === 11155111 && process.env.ETHERSACN_API_KEY) {
    // 避免在thersscan获取到空合约
    console.log('waiting for 5 confirmations');
    await fundMe.deploymentTransaction().wait(5);
  
    await verifyFundMe(fundMe.target, [10])
  } else {
    console.log('verification skipped..');
  };
});

async function verifyFundMe(fundMeAddr, args) {
  await hre.run("verify:verify", {
    address: fundMeAddr,
    constructorArguments: args
  });
};

module.exports = {}