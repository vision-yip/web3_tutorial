
const {ethers, deployments, getNamedAccounts} = require('hardhat');
const {assert,expect} = require('chai');
const helpers = require('@nomicfoundation/hardhat-network-helpers');
const { DEVLOPMENT_CHAINS } = require('../../helper-hardhat-config');

DEVLOPMENT_CHAINS.includes(network.name)
? describe.skip
: describe('test fundme contract', async function() {
  let fundMe;
  let firstAccount;
  beforeEach(async function() {
    await deployments.fixture(['all']);
    firstAccount = (await getNamedAccounts()).firstAccount;
    const fundMeDeployment = await deployments.get('FundMe');
    fundMe = await ethers.getContractAt('FundMe', fundMeDeployment.address);
  });

  // test fund and getFund successfully
  it('fund and getFund successfully', async function() {
    // make sure target reached
    await fundMe.fund({ value: ethers.parseEther('0.5') });
    // make sure window closed
    await new Promise(resolve => setTimeout(resolve, 110 * 1000));
    // make sure we can get receipt
    const getFundTx = await fundMe.getFund();
    const getFundReceipt = await getFundTx.wait();
    expect(getFundReceipt).to.be.emit(fundMe, 'FundWithdrawByOwner').withArgs( ethers.parseEther('0.5'));

  });

  // test fund and refund successfully
  it('fund and refund successfully', async function() {
    // make sure target reached
    await fundMe.fund({ value: ethers.parseEther('0.001') });
    // make sure window closed
    await new Promise(resolve => setTimeout(resolve, 110 * 1000));
    // make sure we can get receipt
    const refundTx = await fundMe.refund();
    const refundReceipt = await refundTx.wait();
    expect(refundReceipt).to.be.emit(fundMe, 'RefundByFunder').withArgs( ethers.parseEther('0.001'));
  });

});