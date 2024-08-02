// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract windabzSwiss is ERC721 {
    uint256 private _nextTokenId;

    constructor () ERC721("Windabz", "WDZ") {_nextTokenId = 1;
    }

    function MintERC721() public {
        uint256 tokenId = _nextTokenId;
        _safeMint(msg.sender, tokenId);
        _nextTokenId++;
    }
}
