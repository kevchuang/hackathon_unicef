Web3 = require("web3")

web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://' + "35.181.154.30" + ':' + "8545", 5000));

var contract_abi = [
    {
      "constant": true,
      "inputs": [],
      "name": "ownerAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "id",
          "type": "int256"
        },
        {
          "indexed": false,
          "name": "phoneNumber",
          "type": "bytes"
        },
        {
          "indexed": false,
          "name": "newBornData",
          "type": "bytes"
        }
      ],
      "name": "evNewBornAdded",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newwriter",
          "type": "address"
        }
      ],
      "name": "allowNewDataWriter",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "writeraddr",
          "type": "address"
        },
        {
          "name": "isactive",
          "type": "bool"
        }
      ],
      "name": "changeDataWriter",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newbornId",
          "type": "int256"
        },
        {
          "name": "phoneNumber_",
          "type": "bytes"
        },
        {
          "name": "newBornData_",
          "type": "bytes"
        }
      ],
      "name": "addNewborn",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

var owneraccount = "0x8bfb7a4ec62be9b7d438ba2efa31af4e9e601a28"
var contract_address = "0xaE13F3e1Eb008e36872D59d3B1E2175eECafdee4"
const nbSC = new web3.eth.Contract(contract_abi, contract_address);

theowner = nbSC.methods.ownerAddress.call();
console.log("theowner = " + theowner)

const privateKey1 = Buffer.from('0xeebb035df549c28d793d7bd242852faf00d752bee156c631e81c58fdc9993551', 'hex');
var officer_address = "0xaa6d628934303d6b22b2a0c487bf7873bffd544a"
//nbSC.methods.allowNewDataWriter();

web3.eth.getTransactionCount(owneraccount, (err, txCount) => {
      // Build the transaction
      const txObject = {
        nonce:    web3.utils.toHex(txCount),
        to:       contract_address,
        value:    web3.utils.toHex(web3.utils.toWei('0', 'ether')),
        gasLimit: web3.utils.toHex(2100000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),
        data: officer_address  
      }
        // Sign the transaction
        const tx = new Tx(txObject);
        tx.sign(privateKey1);
    
        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');
    
        // Broadcast the transaction
        const transaction = web3.eth.sendSignedTransaction(raw, (err, tx) => {
            console.log(tx)
        });
});