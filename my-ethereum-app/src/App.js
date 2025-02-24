import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import SimpleEnergyMarket from './abi/SimpleEnergyMarket.json';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import BuyerPage from './components/BuyerPage'; 
import SellerPage from './components/SellerPage'; 
import './App.css';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initializeWeb3 = async () => {
      try {
        if (!window.ethereum) {
          alert("MetaMask non détecté. Veuillez installer MetaMask.");
          return;
        }
  
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
  
        // Demander l'accès aux comptes uniquement si aucun compte n'est défini
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
  
        const networkId = await web3Instance.eth.net.getId();
        const contractAddress = '0xBf73E4a20516c549D000D01B563F270528592D26';
        const contractInstance = new web3Instance.eth.Contract(SimpleEnergyMarket.abi, contractAddress);
  
        setContract(contractInstance);
      } catch (error) {
        console.error("Erreur d'initialisation de Web3 ou de contrat: ", error.message || error);
      }
    };
  
    initializeWeb3();
  }, []);
  

  return (
    <div>
      {web3 && account && contract ? (
        <Router>
          <Routes>
            <Route path="/" element={<HomePage web3={web3} account={account} contract={contract} />} />
            <Route path="/buyer" element={<BuyerPage web3={web3} account={account} contract={contract} />} />
            <Route path="/seller" element={<SellerPage web3={web3} account={account} contract={contract} />} />
          </Routes>
        </Router>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default App;

