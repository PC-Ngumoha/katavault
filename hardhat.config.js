require('dotenv').config();
require('@nomicfoundation/hardhat-toolbox');

const {API_URL, SEPOLIA_PRIV_KEY, ETHSCAN_KEY} = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.18',
  networks: {
    sepolia: {
      url: `${API_URL}`,
      accounts: [SEPOLIA_PRIV_KEY]
    }
  },
  etherscan: {
    apiKey: {
      sepolia: ETHSCAN_KEY
    }
  }
};
