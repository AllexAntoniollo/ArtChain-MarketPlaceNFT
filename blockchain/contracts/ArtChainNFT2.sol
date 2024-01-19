// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ArtChainNFT2 is ERC1155 {
    uint256 private _nextTokenId = 0;
    string public constant BASE_URL = "https://amaranth-occasional-crane-340.mypinata.cloud/ipfs/";
    mapping(uint => string) private _tokenURIs;
    constructor()
        ERC1155(BASE_URL)
    {
    }

    function mint(uint256 amount, string calldata url)
        external  
    {
        ++_nextTokenId;
        _mint(msg.sender, _nextTokenId, amount, "");
        _setUri(_nextTokenId,url);

    }

    function uri(uint256 id) public view override returns (string memory) {
        return _tokenURIs[id];
    }

    function _setUri(uint256 id, string calldata url) internal{
        _tokenURIs[id] = string.concat(BASE_URL,url);
    }


}
