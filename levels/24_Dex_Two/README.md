# Dex Two

The files in this directory provide the solution to the "Dex Two" level.

## Solution
- The `swap` function does not check that the input `from` and `to` fields match the tokens in the pool.
- Two malicious tokens can be created with 100 tokens initially minted to the DEX contract and another 100 minted to the HackDexTwo contract
- The malicious tokens override the `transferFrom` ERC-20 method to do nothing
- By swapping from malicious token 1 to real token 2 for an amount of 100, the real token will be transfered. The same can be done to transfer real token 1.

## Running the Script
```{bash}
npx hardhat run scripts/hack.js --network rinkeby
```

## Testing
To test the solution, the `scripts/hack.js` script can be run on a fork of the Rinkeby testnet:
```{bash}
npx hardhat run scripts/hack.js --network hardhat
```
