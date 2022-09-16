# Vault

The files in this directory provide the solution to the "Vault" level.

## Solution
The `Vault` contract stores the `password` value required for unlocking the contract as a private variable. While private variables cannot be read on-chain by other contracts, they can be accessed off-chain.

## Running the Script
```{bash}
npx hardhat run scripts/hack.js --network rinkeby
```

## Testing
To test the solution, the `scripts/hack.js` script can be run on a fork of the Rinkeby testnet:
```{bash}
npx hardhat run scripts/hack.js --network hardhat
```
