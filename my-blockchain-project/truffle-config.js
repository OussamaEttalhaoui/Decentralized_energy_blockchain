module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",    // Adresse de Ganache
      port: 7545,           // Port de Ganache (le port par défaut est 7545)
      network_id: "*",      // Utilisation de tous les ID de réseau (correspond à Ganache)
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",   
    },
  },
};
