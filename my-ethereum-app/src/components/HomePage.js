import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ web3, account, contract }) => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (role) => {
    setRole(role);
    if (role === 'Acheteur') {
      navigate('/buyer'); // Rediriger vers la page Acheteur
    } else if (role === 'Vendeur') {
      navigate('/seller'); // Rediriger vers la page Vendeur
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-8">
        <div className="container mx-auto flex flex-col items-center justify-center space-y-4">
          <h1 className="text-4xl font-bold">Bienvenue dans votre marché d'énergie</h1>
          <p className="text-lg">Compte connecté : {account}</p>
        </div>
      </div>

      <div className="container mx-auto p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">Sélectionnez votre rôle</h2>
          <p className="text-lg text-gray-500">Choisissez si vous êtes un acheteur ou un vendeur.</p>
        </div>

        <div className="flex justify-center space-x-6">
          {/* Card pour l'acheteur */}
          <div className="max-w-xs bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-center text-green-500 mb-4">Acheteur</h3>
            <p className="text-center text-gray-600 mb-4">Accédez au marché pour acheter de l'énergie.</p>
            <button
              className="w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105"
              onClick={() => handleRoleChange('Acheteur')}
            >
              Choisir Acheteur
            </button>
          </div>

          {/* Card pour le vendeur */}
          <div className="max-w-xs bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-center text-orange-500 mb-4">Vendeur</h3>
            <p className="text-center text-gray-600 mb-4">Vendez votre énergie sur le marché.</p>
            <button
              className="w-full px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-600 transition duration-300 transform hover:scale-105"
              onClick={() => handleRoleChange('Vendeur')}
            >
              Choisir Vendeur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
