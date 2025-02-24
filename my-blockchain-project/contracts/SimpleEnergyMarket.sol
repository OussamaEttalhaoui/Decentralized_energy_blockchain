// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleEnergyMarket {
    address public owner;

    struct Offer {
        address seller;
        uint256 quantity;
        uint256 price; // en wei
        string energyType;
    }

    Offer[] public offers; // Liste des offres
    mapping(address => string) public roles; // Roles des utilisateurs

    string constant BUYER = "Acheteur";
    string constant SELLER = "Vendeur";

    constructor() {
        owner = msg.sender;
    }

    // Definir le role de l'utilisateur
    function setRole(string memory role) public {
        require(
            keccak256(abi.encodePacked(role)) == keccak256(abi.encodePacked(BUYER)) ||
            keccak256(abi.encodePacked(role)) == keccak256(abi.encodePacked(SELLER)),
            "Role invalide"
        );
        roles[msg.sender] = role;
    }

    // Ajouter une offre (uniquement pour les vendeurs)
    function addOffer(uint256 quantity, uint256 price, string memory energyType) public {
        require(quantity > 0 && price > 0, "Quantite et prix doivent etre superieurs a 0");
        require(bytes(energyType).length > 0, "Type d'energie requis");

        // Log avant d'ajouter l'offre
    emit OfferAdded(msg.sender, quantity, price, energyType);

        offers.push(Offer(msg.sender, quantity, price, energyType));
    }
    event OfferAdded(address seller, uint256 quantity, uint256 price, string energyType);

    

    // Recuperer toutes les offres
    function getOffers() public view returns (Offer[] memory) {
        return offers;
    }

    // Acheter de l'energie (par un acheteur)
    function buyOffer(uint256 offerIndex) public payable {
        
        require(offerIndex < offers.length, "Offre invalide");

        Offer storage offer = offers[offerIndex];
        require(msg.value == offer.price * offer.quantity, "Montant incorrect");
        require(offer.quantity > 0, "Offre epuisee");

        // Transfert des fonds et mise a jour de l'offre
        payable(offer.seller).transfer(msg.value);
        offer.quantity = 0; // Offre epuisee
    }
}