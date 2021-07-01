const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const infuraKey = "b2b9cf80ce7f4d558fd1b1797012ac1a";
const fs = require("fs");
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545,
    },
    kovan: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://kovan.infura.io/v3/${infuraKey}`
        ),
      network_id: 42, // Kovan's id
      gas: 5000000,
      gasPrice: 25000000000,
    },
  },

  // Configure your compilers

  compilers: {
    solc: {
      version: "^0.8.4",
    },
  },
};
