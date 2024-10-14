const LOCK_TIME = 100;
const DECIMAL = 8;
const INITIAL_ANSWER = 3000 * 10 ** DECIMAL;
const DEVLOPMENT_CHAINS = ['hardhat', 'local'];
const CONFIRMATIONS = 5; // 避免在ethersscan获取到空合约要等待的区块数
const NETWORK_CONFIG = {
  11155111: { // sepolia
    ethUsdDataFeed: '0x694AA1769357215DE4FAC081bf1f309aDC325306'
  }
};

module.exports = {
  LOCK_TIME,
  DECIMAL,
  INITIAL_ANSWER,
  DEVLOPMENT_CHAINS,
  CONFIRMATIONS,
  NETWORK_CONFIG,
};