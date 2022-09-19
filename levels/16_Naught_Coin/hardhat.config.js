require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.6.12",
  networks: {
    hardhat: {
      mining: {
        auto: false,
        interval: [3000, 6000]
      },
      forking: {
        url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_RINKEBY_API_KEY}`
      },
      accounts: [
        {privateKey: process.env.PRIVATE_KEY, balance: '1000000000000000000'},
        {privateKey: process.env.PRIVATE_KEY2, balance: '1000000000000000000'},
      ]
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_RINKEBY_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY, process.env.PRIVATE_KEY2]
    }
  }
};
