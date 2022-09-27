# Dex

The files in this directory provide the solution to the "Dex" level.

## Solution
- Rounding error in the swap price calculation results in swaps such that after swapping token 1 for token 2 and then back again, the balance afterwards is different. This can be used to repeatedly swap between the tokens until the DEX runs out of one of the tokens.

## Running the Script
```{bash}
npx hardhat run scripts/hack.js --network rinkeby
```

## Testing
To test the solution, the `scripts/hack.js` script can be run on a fork of the Rinkeby testnet:
```{bash}
npx hardhat run scripts/hack.js --network hardhat
```
