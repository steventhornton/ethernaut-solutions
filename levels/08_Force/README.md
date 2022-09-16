# Force

The files in this directory provide the solution to the "Force" level.

## Solution
Since the `Force` contract is empty, it won't accept ether payments. One workaround is to create a contract and call the `selfdestruct` method on that contract where any ether sent will be forwarded to the `Force` contract instance.

## Running the Script
```{bash}
npx hardhat run scripts/hack.js --network rinkeby
```

## Testing
To test the solution, the `scripts/hack.js` script can be run on a fork of the Rinkeby testnet:
```{bash}
npx hardhat run scripts/hack.js --network hardhat
```
