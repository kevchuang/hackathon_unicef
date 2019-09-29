/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   }, 
 */

var HDWalletProvider = require("truffle-hdwallet-provider");

var mnemonic = "volcano art salad before myself mother basic rain crucial wealth sure weekend";
var privkeyOwner = "0x7d25d2760eb0f59251427fb603e1096fb4dbaed324681bd35efceb33f6db088c"


module.exports = {
  networks: {
    ganache: {
      from: "0x238f43b8F89CDD90B9120fab3D41FD55417e7797", // Defaults to first address from Ganache
      host: "127.0.0.1", 
      port: 7545,
      network_id: "*",
      gas: 7996000
    },
    skillz: {
      from: "0x7d9f2A02461e5C7DB4CD6C151Bc7680bB7b31119", 
      provider: () => 
        new HDWalletProvider(privkeyOwner, "http://35.181.154.30"),
      port: 8545,
      network_id: "*",
      gas: 4500000
    },
    // ROPSTEN PUB KEY    0x8bfb7a4ec62be9b7d438ba2efa31af4e9e601a28
    // ROPSTEN PRIV KEY   0xeebb035df549c28d793d7bd242852faf00d752bee156c631e81c58fdc9993551
    ropsten: {
      // Make sure the from address you use is entirely lowercase or you will see an error like this: 
          // TypeError: private key should be a Buffer
      from: "0x8bfb7a4ec62be9b7d438ba2efa31af4e9e601a28",
      provider: () => 
        new HDWalletProvider(mnemonic, "https://ropsten.infura.io/KE6c2z60PJXKFCTLAtXC"),
      port: 443,
      network_id: 3,
      gas: 4500000
    }
  }
}

