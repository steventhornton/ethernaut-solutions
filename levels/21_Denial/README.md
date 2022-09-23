# Denial

The files in this directory provide the solution to the "Denial" level.

## Solution
The `Denial` contract can be bricked by setting the `partner` (`setWithdrawPartner`) to a contract whose receive function is an infinite loop. This will cause the `withdraw` method to always fail. 

## Running the Script
```{bash}
npx hardhat run scripts/hack.js --network rinkeby
```

## Testing
To test the solution, the `scripts/hack.js` script can be run on a fork of the Rinkeby testnet:
```{bash}
npx hardhat run scripts/hack.js --network hardhat
```
