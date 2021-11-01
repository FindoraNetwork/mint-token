import '@nomiclabs/hardhat-ethers';
import * as fs from 'fs';

const mnemonic = fs.readFileSync('.secret').toString().trim();

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    dev: {
      url: "https://dev-evm.dev.findora.org:8545",
      chainId:523,
      accounts: [mnemonic]
    },
    test: {
      url: "https://prod-forge.prod.findora.org:8545",
      chainId:525,
      accounts: [mnemonic]
    }
  },
  solidity: {
    version: "0.6.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: './build/cache',
    artifacts: './build/artifacts',
  },
  mocha: {
    timeout: 20000
  },
  gasReporter: {
    currency: 'USD',
    enabled: true,
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: '**',
  }
}