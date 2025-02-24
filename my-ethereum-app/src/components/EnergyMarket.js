// import React, { useState, useEffect } from 'react';

// const EnergyMarket = ({ web3, account, contract, role }) => {
//   const [offers, setOffers] = useState([]);
//   const [quantity, setQuantity] = useState('');
//   const [pricePerUnit, setPricePerUnit] = useState('');
//   const [selectedOffer, setSelectedOffer] = useState(null);

//   // Charger les offres disponibles
//   const fetchOffers = async () => {
//     try {
//       const offers = await contract.methods.getOffers().call();
//       setOffers(offers);
//     } catch (error) {
//       console.error("Erreur lors de la récupération des offres :", error);
//     }
//   };


//   useEffect(() => {
//     if (contract) fetchOffers();
//   }, [contract]);

//   // Ajouter une offre (vendeur)
//   const addOffer = async () => {
//     if (role !== 'Vendeur') {
//       alert("Seuls les vendeurs peuvent ajouter des offres.");
//       return;
//     }
//     try {
//       await contract.methods.addOffer(quantity, web3.utils.toWei(pricePerUnit, 'ether')).send({ from: account });
//       alert("Offre ajoutée avec succès !");
//       fetchOffers();
//     } catch (error) {
//       console.error("Erreur lors de l'ajout de l'offre :", error);
//     }
//   };

//   // Acheter de l'énergie (acheteur)
//   const purchaseEnergy = async () => {
//     if (role !== 'Acheteur') {
//       alert("Seuls les acheteurs peuvent acheter de l'énergie.");
//       return;
//     }
//     if (!selectedOffer) {
//       alert("Veuillez sélectionner une offre.");
//       return;
//     }
//     try {
//       const offerId = selectedOffer.index;
//       const totalPrice = selectedOffer.price * selectedOffer.quantity; // Calculer le prix total

//       await contract.methods.buyOffer(offerId).send({
//         from: account,
//         value: totalPrice, // Envoyer le montant total
//       });

//       alert("Énergie achetée avec succès !");
//       fetchOffers();
//       setSelectedOffer(null); // Réinitialiser l'offre sélectionnée après achat
//     } catch (error) {
//       console.error("Erreur lors de l'achat d'énergie :", error);
//     }
//   };

//   return (
//     <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
//       <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Marché d'énergie</h2>

//       {role === 'Vendeur' && (
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">Ajouter une offre</h3>
//           <div className="grid gap-4">
//             <input
//               type="number"
//               placeholder="Quantité"
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//               className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <input
//               type="number"
//               placeholder="Prix par unité (ETH)"
//               value={pricePerUnit}
//               onChange={(e) => setPricePerUnit(e.target.value)}
//               className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <button
//               onClick={addOffer}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               Ajouter une offre
//             </button>
//           </div>
//         </div>
//       )}

//       <h3 className="text-xl font-semibold text-gray-800 mb-4">Offres disponibles</h3>
//       <ul className="space-y-4">
//         {offers.map((offer, index) => (
//           <li key={index} className="p-4 border rounded-lg bg-white shadow-sm">
//             <p className="text-gray-700">
//               <strong>Vendeur :</strong> {offer.seller}
//             </p>
//             <p className="text-gray-700">
//               {/* <strong>Quantité :</strong> {offer.quantity} */}
//               <strong>Quantité :</strong> {offer.quantity.toString()}
//             </p>
//             <p className="text-gray-700">
//               <strong>Prix par unité :</strong> {web3.utils.fromWei(offer.price, 'ether')} ETH
//             </p>
//             {role === 'Acheteur' && (
//               <button
//                 onClick={() => setSelectedOffer({ ...offer, index })}
//                 className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//               >
//                 Sélectionner
//               </button>
//             )}
//           </li>
//         ))}
//       </ul>

//       {role === 'Acheteur' && selectedOffer && (
//         <div className="mt-8">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirmer l'achat</h3>
//           <div className="grid gap-4">
//             <button
//               onClick={purchaseEnergy}
//               className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//             >
//               Acheter toute l'offre
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EnergyMarket;

import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc } from "firebase/firestore";

import { db } from '../firebase'; 
const EnergyMarket = ({ web3, account, contract, role }) => {
  const [offers, setOffers] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [energyType, setEnergyType] = useState('');

  const energyTypes = ['Électricité', 'Gaz', 'Énergie solaire', 'Énergie éolienne'];


  // Charger les offres disponibles
  const fetchOffers = async () => {
    try {
      const offers = await contract.methods.getOffers().call();
      setOffers(offers);
    } catch (error) {
      console.error("Erreur lors de la récupération des offres :", error);
    }
  };

  useEffect(() => {
    if (contract) fetchOffers();
  }, [contract]);

  // Ajouter une offre (vendeur)
  const addOffer = async () => {
    if (role !== 'Vendeur') {
      alert("Seuls les vendeurs peuvent ajouter des offres.");
      return;
    }
    try {
      await contract.methods.addOffer(quantity, web3.utils.toWei(pricePerUnit, 'ether'), energyType).send({ from: account });
      alert("Offre ajoutée avec succès !");
      fetchOffers();
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'offre :", error);
    }
  };

  // Acheter de l'énergie (acheteur)
  // Acheter de l'énergie (acheteur)
// Acheter de l'énergie (acheteur)
const purchaseEnergy = async () => {
  if (role !== 'Acheteur') {
    alert("Seuls les acheteurs peuvent acheter de l'énergie.");
    return;
  }
  if (!selectedOffer) {
    alert("Veuillez sélectionner une offre.");
    return;
  }
  try {
    const offerId = selectedOffer.index;
    const totalPrice = selectedOffer.price * selectedOffer.quantity;

    // Acheter l'offre sur le smart contract
    await contract.methods.buyOffer(offerId).send({
      from: account,
      value: totalPrice,
    });

    alert("Énergie achetée avec succès !");

    // Afficher les informations importantes dans la console
    console.log("Adresse du vendeur :", selectedOffer.seller);
    console.log("Adresse de l'acheteur :", account);
    console.log("Quantité achetée :", selectedOffer.quantity);
    console.log("type denergie :", selectedOffer.energyType);

    console.log("Prix total de la transaction :", web3.utils.fromWei(totalPrice.toString(), 'ether') + " ETH");

    // Sauvegarder la transaction dans Firestore
    alert("Tentative de sauvegarde de la transaction...");

    saveTransaction(account, selectedOffer.seller, selectedOffer.quantity, selectedOffer.price, totalPrice, selectedOffer.energyType);

    fetchOffers(); // Rafraîchir les offres après l'achat
    setSelectedOffer(null); // Réinitialiser l'offre sélectionnée après achat
  } catch (error) {
    console.error("Erreur lors de l'achat d'énergie :", error);
  }
};

// Fonction pour enregistrer une transaction dans Firestore
const saveTransaction = async (buyer, seller, quantity, pricePerUnit, totalPrice ,energyType) => {
  try {
    const transactionRef = collection(db, "transactions");

    // Vérifiez si les données sont valides et convertissez les types si nécessaire
    const offerId = Math.random().toString(36).substr(2, 9);  // Générer un ID aléatoire pour l'offre
    const sellerAddress = seller || "seller_inconnu";  // Valeur par défaut si seller est undefined
    const quantityAmount = quantity ? Number(quantity) : 0;  // Convertir en nombre si non défini
    const priceAmount = pricePerUnit ? Number(pricePerUnit) : 0;  // Convertir en nombre si non défini
    const totalAmount = totalPrice ? Number(totalPrice) : 0;  // Convertir en nombre si non défini
    const timestamp = new Date();

    // Enregistrer la transaction dans Firestore
    await addDoc(transactionRef, {
      offerId: offerId,
      seller: sellerAddress,
      buyer: buyer,
      quantity: quantityAmount,
      pricePerUnit: priceAmount,
      totalPrice: totalAmount,
      energyType: energyType || "Type inconnu",
      timestamp: timestamp,
    });

    console.log("Transaction sauvegardée avec succès !");
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de la transaction : ", error);
  }
};

contract.events.OfferAdded({}, (error, event) => {
  if (error) {
    console.error("Erreur d'événement :", error);
  } else {
    console.log("Événement OfferAdded :", event);
  }
});





  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Marché d'énergie</h2>

      {role === 'Vendeur' && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Ajouter une offre</h3>
          <div className="grid gap-4">
            <input
              type="number"
              placeholder="Quantité"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              value={energyType}
              onChange={(e) => setEnergyType(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>-- Sélectionner un type d'énergie --</option>
              {energyTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Prix par unité (ETH)"
              value={pricePerUnit}
              onChange={(e) => setPricePerUnit(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={addOffer}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Ajouter une offre
            </button>
          </div>
        </div>
      )}

      <h3 className="text-xl font-semibold text-gray-800 mb-4">Offres disponibles</h3>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200 bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Vendeur</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Quantité</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Type d'énergie</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Prix par unité (ETH)</th>
              {role === "Acheteur" && <th className="border border-gray-300 px-4 py-2 text-left">Action</th>}
            </tr>
          </thead>
          <tbody>
            {offers.map((offer, index) => {
              if (offer.quantity <= 0) {
                console.log(`Offre ignorée (quantité = 0): ${offer.seller}`);
                return null; // Skip the offer if the quantity is 0
              }
              return (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{offer.seller}</td>
                  <td className="border border-gray-300 px-4 py-2">{offer.quantity.toString()}</td>
                  <td className="border border-gray-300 px-4 py-2">{offer.energyType}</td>
                  <td className="border border-gray-300 px-4 py-2">{web3.utils.fromWei(offer.price, "ether")}</td>
                  {role === "Acheteur" && (
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => setSelectedOffer({ ...offer, index })}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                      >
                        Sélectionner
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>


      {role === 'Acheteur' && selectedOffer && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirmer l'achat</h3>
          <div className="grid gap-4">
            <button
              onClick={purchaseEnergy}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Acheter toute l'offre
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnergyMarket;
