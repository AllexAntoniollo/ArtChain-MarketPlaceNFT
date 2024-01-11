// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";


contract ArtChain is ReentrancyGuard {


    uint private listingPrice = 1 ether;
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
        require(msg.value >= listingPrice, "The cost of listing price is 1 Matic");
        require(price > 0, "The price must be greather than 0");
        ++_marketId;
         marketItems[_marketId] =  MarketItem(
            _marketId, nftContract, tokenId, payable(msg.sender), payable(address(0)), price, false
         );
        IERC721(nftContract).approve(address(this), tokenId);
        IERC721(nftContract).transferFrom(msg.sender,address(this),tokenId);
        emit MarketItemCreated(_marketId, nftContract, tokenId, msg.sender, price);
        payable(owner).transfer(listingPrice);
    }


    function createMarketSale(address nftContract, uint marketId) public payable nonReentrant{
        uint price = marketItems[marketId].price;
        uint tokenId = marketItems[marketId].tokenId;

        require(msg.value == price, "Please submit the asking price in order to complete purchase");
        marketItems[marketId].seller.transfer(msg.value);

        ++_marketSold;
        IERC721(nftContract).transferFrom(address(this),msg.sender,tokenId);

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
