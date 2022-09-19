# Gatekeeper Two

The files in this directory provide the solution to the "Gatekeeper Two" level.

## Solution
1. Gate 1 is solved by sending the transaction through a contract. `tx.origin` will be the EOA that initiated the transaction and `msg.sender` will be the contract.
2. Gate 2 is solved by sending the transaction in the constructor for the contract. The contract size (`extcodesize(caller())`) will be 0 as the contract has not been fully deployed yet.
3. 
- `uint64(0) - 1` will be equal to `uint64.max` which is equal to `bytes8`: `0xffffffffffffffff`.
- Since `^` is the bitwise XOR operator, `_gateKey` must be true in any positions `uint64(bytes8(keccak256(abi.encodePacked(address(this)))))` is false. This can be done by running XOR on `uint64(bytes8(keccak256(abi.encodePacked(address(this))))` and `uint64.max`.


## Running the Script
```{bash}
npx hardhat run scripts/hack.js --network rinkeby
```

## Testing
To test the solution, the `scripts/hack.js` script can be run on a fork of the Rinkeby testnet:
```{bash}
npx hardhat run scripts/hack.js --network hardhat
```
