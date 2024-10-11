# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

You need in local add .env file
```
SEPOLIA_URL=YOU_SEPOLIA_TEST_URL
PRIVATE_KEY=YOU_TEST_ACCOUNT0_PRIVATE_KEY
PRIVATE_KEY1=YOU_TEST_ACCOUNT1_PRIVATE_KEY
ETHERSCAN_API_KEY=YOU_ETHERSSCAN_API
```

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
npx hardhat deploy-fundme [--network] [sepolia]
npx hardhat interact-fundme [--network] [sepolia]
```
