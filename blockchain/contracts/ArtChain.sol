// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/interfaces/IERC165.sol";


contract ArtChain is ReentrancyGuard, ERC1155Holder {


    uint private listingPrice = 0.01 ether;
        struct MarketItem{
        uint itemId;
        address nftContract;
        uint tokenId;
        address payable seller;
        address payable owner;        
        uint price;
        bool sold;
    }
    mapping(uint => MarketItem) public marketItems;
    uint private _marketId = 0;
    uint private _marketSold = 0;
    address payable immutable private owner;


    constructor(){
        owner = payable(msg.sender);
    }


    event MarketItemCreated(uint indexed marketId, address indexed nftContract, uint indexed tokenId, address seller, uint price);

    function createMarketItem(uint price, address nftContract, uint tokenId) public payable nonReentrant{
        require(msg.value >= listingPrice, "The cost of listing price is 0.01 Matic");
        require(price > 0, "The price must be greather than 0");
        ++_marketId;
         marketItems[_marketId] =  MarketItem(
            _marketId, nftContract, tokenId, payable(msg.sender), payable(address(0)), price, false
         );
         if (IERC165(nftContract).supportsInterface(0xd9b67a26)) {
            IERC1155(nftContract).safeTransferFrom(msg.sender,address(this),tokenId,1,"");
         }else if(IERC165(nftContract).supportsInterface(0x80ac58cd)){
            IERC721(nftContract).transferFrom(msg.sender,address(this),tokenId);
         }
         else{
            revert("Unsupported NFT contract interface");
         }
        emit MarketItemCreated(_marketId, nftContract, tokenId, msg.sender, price);
        payable(owner).transfer(listingPrice);
    }


    function createMarketSale(address nftContract, uint marketId) public payable nonReentrant{
        
        uint price = marketItems[marketId].price;
        uint tokenId = marketItems[marketId].tokenId;
        require(msg.value == price, "Please submit the asking price in order to complete purchase");

        marketItems[marketId].seller.transfer(msg.value);

        ++_marketSold;
        if (IERC165(nftContract).supportsInterface(0xd9b67a26)) {
            IERC1155(nftContract).safeTransferFrom(address(this),msg.sender,tokenId,1,"");
         }else if(IERC165(nftContract).supportsInterface(0x80ac58cd)){
            IERC721(nftContract).transferFrom(address(this),msg.sender,tokenId);
         }
         else{
            revert("Unsupported NFT contract interface");
         }

        marketItems[marketId].owner = payable(msg.sender);
        marketItems[marketId].sold = true;

    }


    function fetchItemsCreated() public view returns(MarketItem[] memory){
        uint count = 0;

        for(uint i=1;i <= _marketId; ++i){
            if(marketItems[i].seller == address(msg.sender)){
                ++count;
            }
        }

        MarketItem[] memory items = new MarketItem[](count);
        uint currentIndex = 0;

        for(uint i=1; i <= _marketId; ++i){
            if(marketItems[i].seller == msg.sender){
                items[currentIndex] = marketItems[i];
                ++currentIndex;
            }
        }

        return items; 
    }


    function fetchMarketItems() public view returns(MarketItem[] memory){
        uint unsoldItemCount = _marketId - _marketSold;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        uint currentIndex = 0;

        for(uint i=1; i <= _marketId; ++i){
            if(marketItems[i].owner == address(0)){
                items[currentIndex] = marketItems[i];
                ++currentIndex;
            }
        }

        return items;
    }


    function fetchMyNfts() public view returns(MarketItem[] memory){
        uint count = 0;

        for(uint i=1;i <= _marketId; ++i){
            if(marketItems[i].owner == address(msg.sender)){
                ++count;
            }
        }

        MarketItem[] memory items = new MarketItem[](count);
        uint currentIndex = 0;

        for(uint i=1; i <= _marketId; ++i){
            if(marketItems[i].owner == msg.sender){
                items[currentIndex] = marketItems[i];
                ++currentIndex;
            }
        }

        return items; 
    }


 
}
