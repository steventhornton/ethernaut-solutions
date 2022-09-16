# Delegation

The files in this directory provide the solution to the "Delegation" level.

## Solution
The `Delegation` contract contains a fallback method (a method called when an unrecognized function is called) that will calls the `delegatecall` on the address of the `Delegate` contract. This allows for running code from the `Delegate` contract in the context of the `Delegation` contract. Since both contracts have the `owner` variable stored in the first storage slot, and the `pwn` method on the `Delegate` contract will set this to `msg.sender`, calling the `pwn` method on the `Delegation` contract.

## Running the Script
```{bash}
npx hardhat run scripts/hack.js --network rinkeby
```

## Testing
To test the solution, the `scripts/hack.js` script can be run on a fork of the Rinkeby testnet:
```{bash}
npx hardhat run scripts/hack.js --network hardhat
```
