import React, { useState } from "react";
import Web3 from "web3";
import DaiFaucet from "./contracts/DaiFaucet.json";
import Header from "./components/Header";
import Warning from "./components/Warning";
import Form from "./components/Form";

import "./App.css";

function App() {
  let [web3, setWeb3] = useState(null);
  const [balance, setBalance] = useState(0);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [network, setNetwork] = useState(null);

  //setting web3 provider on page load
  window.addEventListener("load", async () => {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      setWeb3(web3);
      try {
        await window.ethereum.enable();
        loadData();
      } catch (error) {
        if (error.code === 4001) {
          alert("Request to access account denied!");
        }
      }
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
      setWeb3(web3);
      loadData();
    } else {
      alert(
        "Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!"
      );
    }
  });

  //below event will be fired by metamask whenever user will change it's metamask account
  window.ethereum.on("accountsChanged", function () {
    window.location.reload();
  });

  // detect Network account change
  window.ethereum.on("networkChanged", function () {
    window.location.reload();
  });

  const loadData = async () => {
    let network = await web3.eth.net.getNetworkType();
    //If network is not kovan then alert user
    if (network !== "kovan") {
      //to convert first letter of network into Upper case
      network =
        network.charAt(0).toUpperCase() + network.substr(1).toLowerCase();
      setNetwork(network);
    }

    let accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const contractInstance = new web3.eth.Contract(
      DaiFaucet.abi,
      "0x62b81A823a56E4c708EC018F9Aada4F9E705B61f"
    );
    setContract(contractInstance);
    let balance = await contractInstance.methods.daiBalance().call();

    //since dai also has 18 decimals therefore converting it into ether like denotation to display to end-user
    balance = web3.utils.fromWei(balance, "ether");
    setBalance(balance);

    let daiOriginalAbi = [
      {
        inputs: [
          { internalType: "uint256", name: "chainId_", type: "uint256" },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "src",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "guy",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "wad",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: true,
        inputs: [
          {
            indexed: true,
            internalType: "bytes4",
            name: "sig",
            type: "bytes4",
          },
          {
            indexed: true,
            internalType: "address",
            name: "usr",
            type: "address",
          },
          {
            indexed: true,
            internalType: "bytes32",
            name: "arg1",
            type: "bytes32",
          },
          {
            indexed: true,
            internalType: "bytes32",
            name: "arg2",
            type: "bytes32",
          },
          {
            indexed: false,
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        name: "LogNote",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "src",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "dst",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "wad",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        constant: true,
        inputs: [],
        name: "DOMAIN_SEPARATOR",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "PERMIT_TYPEHASH",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          { internalType: "address", name: "", type: "address" },
          { internalType: "address", name: "", type: "address" },
        ],
        name: "allowance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "usr", type: "address" },
          { internalType: "uint256", name: "wad", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "usr", type: "address" },
          { internalType: "uint256", name: "wad", type: "uint256" },
        ],
        name: "burn",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [{ internalType: "address", name: "guy", type: "address" }],
        name: "deny",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "usr", type: "address" },
          { internalType: "uint256", name: "wad", type: "uint256" },
        ],
        name: "mint",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "src", type: "address" },
          { internalType: "address", name: "dst", type: "address" },
          { internalType: "uint256", name: "wad", type: "uint256" },
        ],
        name: "move",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "nonces",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "holder", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "nonce", type: "uint256" },
          { internalType: "uint256", name: "expiry", type: "uint256" },
          { internalType: "bool", name: "allowed", type: "bool" },
          { internalType: "uint8", name: "v", type: "uint8" },
          { internalType: "bytes32", name: "r", type: "bytes32" },
          { internalType: "bytes32", name: "s", type: "bytes32" },
        ],
        name: "permit",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "usr", type: "address" },
          { internalType: "uint256", name: "wad", type: "uint256" },
        ],
        name: "pull",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "usr", type: "address" },
          { internalType: "uint256", name: "wad", type: "uint256" },
        ],
        name: "push",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [{ internalType: "address", name: "guy", type: "address" }],
        name: "rely",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "dst", type: "address" },
          { internalType: "uint256", name: "wad", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "src", type: "address" },
          { internalType: "address", name: "dst", type: "address" },
          { internalType: "uint256", name: "wad", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "version",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "wards",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ];

    let daiOriginalContract = new web3.eth.Contract(
      daiOriginalAbi,
      "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa"
    );
    /*Listing to Transfer event which will be fired by original "DAI Stable Coin" contract deployed on Kovan Testnet,
Filtering every transfer where dai coins are sent to our daiFaucet contract*/
    daiOriginalContract.events
      .Transfer({
        filter: {
          dst: "0x62b81A823a56E4c708EC018F9Aada4F9E705B61f",
        },
        fromBlock: 0,
      })
      .on("data", async function () {
        let balance = await contractInstance.methods.daiBalance().call();

        //since dai also has 18 decimals therefore converting it into ether like denotation to display to end-user
        balance = web3.utils.fromWei(balance, "ether");
        setBalance(balance);
      })
      .on("error", console.error);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (document.getElementById("amount").value <= 5) {
      try {
        await contract.methods
          .transferDai(
            document.getElementById("address").value,
            /*user will enter dai in ether like denotation, 
          converting it into wei like denotation before sending to contract*/
            web3.utils.toWei(document.getElementById("amount").value, "ether")
          )
          .send({ from: account });
        let balance = await contract.methods.daiBalance().call();

        //since dai also has 18 decimals therefore converting it into ether like denotation to display to end-user
        balance = web3.utils.fromWei(balance, "ether");
        setBalance(balance);
      } catch {
        alert("Transaction failed, try again!");
      }
    } else {
      alert("Invalid amount entered");
    }
    document.getElementById("form").reset();
  };

  return (
    <div className="App">
      <Header balance={balance} />
      <Warning network={network} />
      <Form handleSubmit={onSubmit} />
    </div>
  );
}

export default App;
