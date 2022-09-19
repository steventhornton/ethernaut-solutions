# Naught Coin

The files in this directory provide the solution to the "Naught Coin" level.

## Solution
1. Approve token tranfer
2. Call the `transferFrom` function which does not include the `lockToken` modifier.

## Running the Script
```{bash}
npx hardhat run scripts/hack.js --network rinkeby
```

## Testing
To test the solution, the `scripts/hack.js` script can be run on a fork of the Rinkeby testnet:
```{bash}
npx hardhat run scripts/hack.js --network hardhat
```
