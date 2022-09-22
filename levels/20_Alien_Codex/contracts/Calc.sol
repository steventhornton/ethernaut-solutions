pragma solidity ^0.5.0;

contract Calc {
    function getIndex() external view returns (uint256) {
        return 2 ** 256 - 1 - uint256(keccak256(abi.encode(1))) + 1;
    }
}
