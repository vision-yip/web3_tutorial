require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require('./tasks');
require('@nomicfoundation/hardhat-ethers');
require('hardhat-deploy');
require('hardhat-deploy-ethers');

// A network request failed. This is an error from the block explorer, not Hardhat.
// https://github.com/smartcontractkit/full-blockchain-solidity-course-js/discussions/2247
const { ProxyAgent, setGlobalDispatcher } = require("undici");
const proxyAgent = new ProxyAgent("http://127.0.0.1:7897");
setGlobalDispatcher(proxyAgent);

const SEPOLIA_URL = process.env.SEPOLIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PRIVATE_KEY1 = process.env.PRIVATE_KEY1;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // defaultNetwork: "hardhat",
  solidity: "0.8.27",
  mocha: {
    timeout: 500000,
  },
  networks: {
    // alchemy, Infura, quickNode
    sepolia: {
      url: SEPOLIA_URL, // alchemy
      accounts: [PRIVATE_KEY, PRIVATE_KEY1],
      chainId: 11155111
    }
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY
    }
  },
  namedAccounts: {
    firstAccount: {
      default: 0
    },
    secondAccount: {
      default: 1
    }
  },
  gasReporter: {
    enabled: false // defaulted:true
  }
};
