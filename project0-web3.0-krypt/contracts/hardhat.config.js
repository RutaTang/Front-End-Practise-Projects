
require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: "", // put your infrua or alchemy ropsten url here
      accounts: [''] // put your test private key here, not private key with real ethers for your asset safety,
    }
  }
}