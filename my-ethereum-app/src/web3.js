// // src/web3.js
// import Web3 from 'web3';
// import detectProvider from '@metamask/detect-provider';

// // Fonction pour vérifier si Metamask est installé
// const checkIfMetamaskInstalled = async () => {
//   const provider = await detectProvider();
//   if (provider) {
//     console.log('Metamask est installé');
//     return provider;
//   } else {
//     console.log('Metamask n\'est pas installé');
//     return null;
//   }
// };

// // Fonction pour initialiser Web3 avec Metamask
// export const initWeb3 = async () => {
//     if (window.ethereum) {
//       const web3 = new Web3(window.ethereum);
//       try {
//         await window.ethereum.enable();  // Demande l'accès au compte Metamask
//         return web3;
//       } catch (error) {
//         console.error('Utilisateur a rejeté la connexion à Metamask');
//         return null;
//       }
//     } else {
//       console.error('Ethereum n\'est pas supporté');
//       return null;
//     }
//   };




// import Web3 from 'web3';

// export const initWeb3 = async () => {
//   if (window.ethereum) {
//     const web3 = new Web3(window.ethereum);
//     await window.ethereum.request({ method: 'eth_requestAccounts' });
//     return web3;
//   } else {
//     alert('MetaMask est nécessaire pour interagir avec l\'application.');
//     return null;
//   }
// };
