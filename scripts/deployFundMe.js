// import ethers.js
// create main function
// execute main function

const { ethers } = require("hardhat");

async function main () {
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

  // init 2 accounts
  const [firstAccount, secondAccount] = await ethers.getSigners();

  // fund contract with first account
  const fundTx = await fundMe.fund({ value: ethers.parseEther('0.01') });
  fundTx.wait();

  // check balance of contract
  const balanceOfContract = await ethers.provider.getBalance(fundMe.target);
  console.log(`Balance of the contract is ${balanceOfContract}`);

  // fund contract with second account
  const fundTxWithSecondAccount = await fundMe.connect(secondAccount).fund({ value: ethers.parseEther('0') });
  fundTxWithSecondAccount.await();
  // check balance of contract
  const balanceOfContractAfterSecondFund = await ethers.provider.getBalance(fundMe.target);
  console.log(`Balance of the contract is ${balanceOfContractAfterSecondFund}`);

  // check mapping funderToAmount
  const firstAccountBalanceInFundMe = await fundMe.funderToAmount(firstAccount);
  const secondAccountBalanceInFundMe = await fundMe.funderToAmount(secondAccount);
  console.log(`Balance of first account ${firstAccount.address} is ${firstAccountBalanceInFundMe}`);
  console.log(`Balance of second account ${secondAccount.address} is ${secondAccountBalanceInFundMe}`);
};

async function verifyFundMe(fundMeAddr, args) {
  await hre.run("verify:verify", {
    address: fundMeAddr,
    constructorArguments: args
  });
};

main().then().catch((error) => {
  console.error(error);
  process.exit(0);
});