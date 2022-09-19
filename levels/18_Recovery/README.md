# Recovery

The files in this directory provide the solution to the "Recovery" level.

## Solution
The address that the ether has been deposited into can be found one of two ways:
1. Look at the contract creation transaction on etherscan
2. Calculate the address from the contract address
The `destroy` method on the `SimpleToken` contract can be used to recover the ether.


## Running the Script
```{bash}
npx hardhat run scripts/hack.js --network rinkeby
```

## Testing
To test the solution, the `scripts/hack.js` script can be run on a fork of the Rinkeby testnet:
```{bash}
npx hardhat run scripts/hack.js --network hardhat
```
