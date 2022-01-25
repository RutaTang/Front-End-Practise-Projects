
require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/fGptq7EaotfiZJE-iupV00i0tvqd0gi1",
      accounts: ['3c52d753ae959060aa1075b5e2cc523c177ef7c537bdbe17cedfcf29f317fdc2']
    }
  }
}