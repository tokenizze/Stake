var account;

if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    try {
        // ask user for permission
        ethereum.enable()
        // user approved permission
    } catch (error) {
        // user rejected permission
        console.log('Usuario negou permissao')
    }
}
else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
    // no need to ask for permission
}
else {
    window.alert('Wallet nao detectada, verifique se metamask está instalada!')
}
console.log(window.web3.currentProvider)

	var abiFarm = JSON.parse('[{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"}, {"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}, {"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"}]');

	var abiMain = JSON.parse('[{"inputs": [{"internalType": "address","name": "spender","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "approve","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"}]');
	


web3.eth.getAccounts(function (err, accounts) {
    if (err != null) {
        alert("Error retrieving accounts.");
        return;
    }
    if (accounts.length == 0) {
        alert("No account found! Make sure the Ethereum client is configured properly.");
        return;
    }
    account = accounts[0];
    console.log('Account: ' + account);
    web3.eth.defaultAccount = account;
});

//Smart contract funcoes
function aprovarStaking(idToken, QtTokens) {
	
	QtTokens = QtTokens + '000000000000000000';
	
	if (idToken == 2) { 
		var contractAddress = '0x2B15C5D6B70CFF872d48403f42F761d5E4F55850';
		var contractAddressFarm = '0x00075AD40fBE5BDDa93fD0e63ac4E16Cd868Cb8a';
	}
	
	if (idToken == 3) { 
		var contractAddress = '0x440f616B45E67095459dc0272fB481367254A316';
		var contractAddressFarm = '0xeD7B8b35f9B16E5890D6Ebb7cAEc9a4795392a0E';
	}
		
	contractMain = new web3.eth.Contract(abiMain, contractAddress);
	contractFarm = new web3.eth.Contract(abiFarm, contractAddressFarm);
	    
    contractMain.methods.approve (contractAddressFarm, QtTokens).send( {from: account}).then( function(tx) {
      console.log("Transaction: ", tx);
    });

  }

  function startStaking(idToken, QtTokens) {
	  
	 if (idToken == 2) { 
		var contractAddress = '0x2B15C5D6B70CFF872d48403f42F761d5E4F55850';
		var contractAddressFarm = '0x00075AD40fBE5BDDa93fD0e63ac4E16Cd868Cb8a';
	}
	
	if (idToken == 3) { 
		var contractAddress = '0x440f616B45E67095459dc0272fB481367254A316';
		var contractAddressFarm = '0xeD7B8b35f9B16E5890D6Ebb7cAEc9a4795392a0E';
	}
		
	contractMain = new web3.eth.Contract(abiMain, contractAddress);
	contractFarm = new web3.eth.Contract(abiFarm, contractAddressFarm);
	
	QtTokens = QtTokens + '000000000000000000';
	
	contractFarm.methods.stake (QtTokens).send( {from: account}).then( function(tx) {
	console.log("Transaction: ", tx);
      });
   
	}

  

  function exitStaking(idToken) {
	
	if (idToken == 2) { 
		var contractAddress = '0x2B15C5D6B70CFF872d48403f42F761d5E4F55850';
		var contractAddressFarm = '0x00075AD40fBE5BDDa93fD0e63ac4E16Cd868Cb8a';
	}
	
	if (idToken == 3) { 
		var contractAddress = '0x440f616B45E67095459dc0272fB481367254A316';
		var contractAddressFarm = '0xeD7B8b35f9B16E5890D6Ebb7cAEc9a4795392a0E';
	}
		
    contractFarm.methods.exit ().send( {from: account}).then( function(tx) {
        console.log("Transaction: ", tx);
      });
  }