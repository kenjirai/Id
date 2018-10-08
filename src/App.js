import React, { Component } from "react";
import getWeb3 from "./getWeb3";


class App extends Component {
   constructor() {
        super();
        this.state = {  id: null, getBool:null };
     }
  
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const abi = [
      {
        "constant": false,
        "inputs": [
          {
            "name": "value",
            "type": "bool"
          }
        ],
        "name": "entryBool",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getBool",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getHash",
        "outputs": [
          {
            "name": "",
            "type": "bytes4"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "quick",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ]

      const web3 = await getWeb3();

      var id = await web3.eth.net.getId();

      var address = "0xcb0cebf39e6677c4d2eef0098d2fc7f10e03bb02";

      var MyContract = new web3.eth.Contract(abi, address);

      var getBool;

      //MyContract.methods.getBool().call().then(console.log);

      /*
      promise.then(
      result => alert(result), // doesn't run
      error => alert(error) // shows "Error: Whoops!" after 1 second
    );
    */

      MyContract.methods.getBool().call().then(
        res => this.setState({getBool:1}),
        err => console.log(err)
        );

    
      //this.setState({ id, getBool});

      //MyContract.methods.getBool().call()
//.then(console.log);

      // Use web3 to get the user's accounts.
      //const accounts = await web3.eth.getAccounts()

       //const accounts = await web3.eth.getAccounts();

       //console.log(mainAccount[0]);

       //web3.eth.sign("0xff",web3.eth.defaultAccount).then(console.log);

       //const sign_msg = await web3.eth.personal.sign("Hello world", accounts[0], " ")
       //console.log(accounts[0])
       //this.setState({ accounts:accounts[0], sign_msg:sign_msg});

      // web3.eth.sign(mainAccount[0], web3.utils.keccak256("Some text")).then(console.log)

       //const result = await web3.eth.sign("Hello world", web3.eth.defaultAccount);
       //console.log(result);
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.

    // console.log(web3.eth.defaultAccount())
     //web3.eth.sign("Hello world", "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe").then(console.log);

      /*  
      web3.personal.sign(web3.toHex("msg"), accounts[0], (err,res) => {
        const sign_msg = res;
        this.setState({ sign_msg });
      });
      */

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  };

  render() {
    return (
      <div className="App">
        <p>{this.state.getBool}</p>
      </div>
    );
  }
}

export default App;
