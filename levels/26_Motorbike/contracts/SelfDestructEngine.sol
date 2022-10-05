pragma solidity <0.7.0;


contract SelfDestructEngine {
    function breakEngine() public payable {
        selfdestruct(msg.sender);
    }
}
