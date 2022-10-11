// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;


interface IDetectionBot {
    function handleTransaction(address user, bytes calldata msgData) external;
}

interface IForta {
    function setDetectionBot(address detectionBotAddress) external;
    function notify(address user, bytes calldata msgData) external;
    function raiseAlert(address user) external;
}

contract Bot is IDetectionBot {

    address vault;

    constructor(address _vault) public {
        vault = _vault;
    }

    function handleTransaction(address user, bytes calldata msgData) override external {
        (,,address origSender) = abi.decode(msgData[4:], (address, uint256, address));
        if (origSender == vault) {
            IForta(msg.sender).raiseAlert(user);
        }
    }
}
