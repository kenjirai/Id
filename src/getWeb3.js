import Web3 from "web3";

const getWeb3 = (network=null) => {
   
   return new Promise((resolve, reject) => {
      let web3;
      if (network) {
        if (network==='ropsten') {
          web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/GZrcaTpu3GAMhJAsE5H2'));
          resolve(web3);
        } else if(network==='rinkeby') {
           web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/GZrcaTpu3GAMhJAsE5H2'));
           resolve(web3);
        }
    } else {
          
        web3 = window.web3;
       const alreadyInjected = typeof web3 !== "undefined";
        if (alreadyInjected) {
          // Use Mist/MetaMask's provider.
          web3 = new Web3(web3.currentProvider);
          console.log("Injected web3 detected.");
          resolve(web3);
        } else {
          web3 = new Web3();
          resolve('Unable to load web3 from provider');
        }
      }
      })
  }

export default getWeb3;
