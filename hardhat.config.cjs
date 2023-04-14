require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()
/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {

 
    networks: {
      
      testnet: {
        url: 'https://rpc.test.btcs.network',
        accounts: [process.env.KEY],
        chainId: 1115,
      },

      mainnet: {
        url: 'https://rpc.coredao.org/',
        accounts: [process.env.KEY],
        chainId: 1116,
      }
    },
    solidity: {
       compilers: [
         {
            version: '0.8.9',
            settings: {
               optimizer: {
                  enabled: true,
                  runs: 200,
               },
            },
         },
       ],
    },
    paths: {
       sources: './contracts',
       cache: './cache',
       artifacts: './artifacts',
    },
    mocha: {
       timeout: 20000,
    },
 };
 