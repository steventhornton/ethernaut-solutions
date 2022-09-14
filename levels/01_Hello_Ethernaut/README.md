# Hello Ethernaut

The files in this directory provide the solution to the "Hello Ethernaut" level.

## Solution
The level is solved by calling the `authenticate` method on the level contract with input value given by the `password` instance variable in the contract.

## Running the Script
```{bash}
npx hardhat run scripts/hack.js --network rinkeby
```

## Testing
To test the solution, the `scripts/hack.js` script can be run on a fork of the Rinkeby testnet:
```{bash}
npx hardhat run scripts/hack.js --network hardhat
```
