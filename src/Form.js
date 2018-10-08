import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import {abi, sendRawData, testAwait}from './helper';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {web3:'', account:'', fullName: '', phoneNumber: '', joinMsg: '', signature:''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayContent = this.displayContent.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

	componentDidMount = async () => {
	  const web3 = await getWeb3();
	  console.log(web3);
	  const account = await web3.eth.getAccounts();
	  this.setState({web3, account})
	}

	handleChange = name => event => {
	 this.setState({ [name]: event.target.value });
	}	

	displayContent() {
		console.log(this.state.joinMsg);
		console.log(this.state.signature);
	}

	registerUser = async () => {

		console.log('inside registerUser');

		let web3 = await getWeb3('ropsten');
				const address = "0xc94b4f8f6eb4a7527db69a94479f5d7f056c3d22";

		const account = "0x50fc71462fe011d132C4D916445ccC25075e75FF";

		const senderAddress = "0xc47c009370926c614419a1d1dd41bccc1bfb352f";

		let myContract = new web3.eth.Contract(abi, address);

	   	let data = await myContract.methods.recordInfo(senderAddress, 
	   				this.state.fullName, this.state.phoneNumber, this.state.signature).encodeABI();
	  
	   	//console.log('Sending data, please wait for tx hash');
	   	sendRawData(web3, address, account, data);
	}

  handleSubmit = async (event) => {
  	event.preventDefault();
  	var joinMsg;
	//alert(this.state.fullName + ':' + this.state.phoneNumber);
	for (var p in this.state) {
		if(p !== 'joinMsg' && p !== 'web3' && p!== 'account' && p!== 'signature'){
			if (!joinMsg) {
				joinMsg = this.state[p];
			} else {
				joinMsg = joinMsg + '<>' + this.state[p];
				}
		}
	}

	var signature = await this.state.web3.eth.personal.sign(joinMsg, this.state.account[0]);
	this.setState({joinMsg, signature});
	this.registerUser();
  }

render(){
	return (
	  <form onSubmit={this.handleSubmit}>
	    <label>
	      Full Name:
	      <input type="text" value={this.state.fullName} onChange={this.handleChange('fullName')} />
	    </label>

	    <label>
	    Phone Number:
	     <input type="text" value={this.state.phoneNumber} onChange={this.handleChange('phoneNumber')} />
	    </label>
	    <input type="submit" value="Submit" />
	  </form>
	);
 }
}

export default Form;

