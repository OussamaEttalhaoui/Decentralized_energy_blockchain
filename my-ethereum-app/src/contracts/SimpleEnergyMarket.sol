pragma solidity ^0.8.0;

contract SimpleEnergyMarket {
    address public owner;

    struct Offer {
        address seller;
        uint256 quantity;
        uint256 price; // en wei
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
    function addOffer(uint256 quantity, uint256 price) public {
        require(
            keccak256(abi.encodePacked(roles[msg.sender])) == keccak256(abi.encodePacked(SELLER)),
            "Vous devez etre un vendeur pour ajouter une offre"
        );
        require(quantity > 0 && price > 0, "Quantite et prix doivent etre superieurs a 0");

        offers.push(Offer(msg.sender, quantity, price));
    }

    // Recuperer toutes les offres disponibles
    function getOffers() public view returns (Offer[] memory) {
        Offer[] memory availableOffers = new Offer[](offers.length);
        uint256 count = 0;
        for (uint256 i = 0; i < offers.length; i++) {
            if (offers[i].quantity > 0) {
                availableOffers[count] = offers[i];
                count++;
            }
        }
        // Reduire la taille du tableau pour ne garder que les offres disponibles
        bytes memory encodedOffers = abi.encode(availableOffers);
        assembly { mstore(add(encodedOffers, 0x40), count) }
        return abi.decode(encodedOffers, (Offer[]));
    }

    // Acheter de l'energie (par un acheteur)
    function buyOffer(uint256 offerIndex) public payable {
        require(
            keccak256(abi.encodePacked(roles[msg.sender])) == keccak256(abi.encodePacked(BUYER)),
            "Vous devez etre un acheteur pour acheter de l'energie"
        );
        require(offerIndex < offers.length, "Offre invalide");

        Offer storage offer = offers[offerIndex];
        require(offer.quantity > 0, "Offre epuisee");
        require(msg.value == offer.price * offer.quantity, "Montant incorrect");

        // Transfert des fonds et mise a jour de l'offre
        payable(offer.seller).transfer(msg.value);
        offer.quantity = 0; // Offre epuisee
    }
}



