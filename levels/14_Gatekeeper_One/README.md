# Gatekeeper One

The files in this directory provide the solution to the "Gatekeeper One" level.

## Solution
1. Gate 1 is solved by sending the transaction through a contract. `tx.origin` will be the EOA that initiated the transaction and `msg.sender` will be the contract.
2. Gate 2 is solved by determining the gas limit to use (by brute force search) such that the remaining gas mod 8191 is 0. A value of 82164 for the gas limit works.
3. Gate 3 has the following requirements:
    - Bytes 3 and 4 of the `_gateKey` must be 0.
    - At least one of bytes 5 - 8 must be non-zero
    - Byes 1 and 2 must match the first two bytes of `tx.origin`

## Running the Script
```{bash}
npx hardhat run scripts/hack.js --network rinkeby
```

## Testing
To test the solution, the `scripts/hack.js` script can be run on a fork of the Rinkeby testnet:
```{bash}
npx hardhat run scripts/hack.js --network hardhat
```
