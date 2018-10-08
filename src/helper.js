const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "sender",
				"type": "address"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "phoneNumber",
				"type": "uint256"
			},
			{
				"name": "signature",
				"type": "string"
			}
		],
		"name": "recordInfo",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "entryRecord",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "phoneNumber",
				"type": "uint256"
			},
			{
				"name": "signature",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "user",
				"type": "address"
			}
		],
		"name": "getName",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "user",
				"type": "address"
			}
		],
		"name": "getSig",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]


async function sendRawData(web3, address, account, data){

	//let web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/GZrcaTpu3GAMhJAsE5H2'));

	var Tx = require('ethereumjs-tx');
	
	var privateKey = new Buffer('e24800eacb96bb7fa1433c357f7070f283670768a202b0c44a38e074353db66f', 'hex');

	//var address = "0x7eeb774d9ae2cef7116ac51c8b05b42b726077b5";

	//var account = "0x50fc71462fe011d132C4D916445ccC25075e75FF";

	//var data = web3.eth.contract(abi).at(address).entryBool.getData(true);

	var accNonce = await web3.eth.getTransactionCount(account);

	/*

	let address = "0xc94b4f8f6eb4a7527db69a94479f5d7f056c3d22";

	var myContract = new web3.eth.Contract(abi, address)
	
   	data = await myContract.methods.recordInfo("0x50fc71462fe011d132C4D916445ccC25075e75FF", 
   				"Deo Rai", Number(123123), '0x323490234').encodeABI();

   	*/
	
	//console.log(data);

	var rawTx = {		
	  nonce: accNonce,
	  gasPrice: '0x02',
	  gasLimit: web3.utils.toHex(300000),
	  to: address,
	  value: '0x00',
	  data: data
	}

	var tx = new Tx(rawTx);
	tx.sign(privateKey);

	var serializedTx = tx.serialize();

	console.log('please wait sending transaction');

	web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
	.on('receipt', console.log);

	}

const testAwait = () => {

   return new Promise((resolve, reject) => {
   		console.log('inside testAwait');
    	resolve('done');
    });
  }

export {abi, sendRawData, testAwait };

