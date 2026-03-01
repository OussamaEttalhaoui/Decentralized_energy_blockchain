import React, { useEffect, useState } from 'react';
import EnergyMarket from './EnergyMarket';

const SellerPage = ({ web3, account, contract }) => {
  const [balance, setBalance] = useState(null);

  // Log pour afficher le rôle et l'adresse du compte
  useEffect(() => {
    console.log("Rôle : Vendeur");
    console.log("Adresse du compte : ", account);

    // Récupérer la balance du compte
    const fetchBalance = async () => {
      try {
        const balanceWei = await web3.eth.getBalance(account); // Balance en Wei
        const balanceEth = web3.utils.fromWei(balanceWei, 'ether'); // Conversion en ETH
        setBalance(balanceEth); // Mise à jour de la balance dans l'état
      } catch (error) {
        console.error("Erreur lors de la récupération de la balance : ", error);
      }
    };

    fetchBalance();
  }, [account, web3]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-center text-orange-600 mb-8">Bienvenue sur la Page du Vendeur</h2>
        <p className="text-lg text-center mb-4">Adresse : {account}</p>
        <p className="text-lg text-center mb-4">Balance : {balance ? `${balance} ETH` : 'Chargement de la balance...'}</p>
        <EnergyMarket web3={web3} account={account} contract={contract} role="Vendeur" />
      </div>
    </div>
  );
};

export default SellerPage;




