// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ArtChainNFT2 is ERC1155 {
    uint256 private _nextTokenId = 0;
    string public constant BASE_URL = "https://amaranth-occasional-crane-340.mypinata.cloud/ipfs/";

    constructor()
        ERC1155(BASE_URL)
    {
    }


    function mint(uint256 amount)
        external  
    {
        ++_nextTokenId;
        _mint(msg.sender, _nextTokenId, amount, "");
    }

    function uri(uint256 id) public pure override returns (string memory) {
        return string.concat(BASE_URL, Strings.toString(id),".json");
    }


}
