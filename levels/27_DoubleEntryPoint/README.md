# DoubleEntryPoint

The files in this directory provide the solution to the "DoubleEntryPoint" level.

## Solution
- A `DetectionBot` can be created to ensure that funds are not being moved out of the vault when calling the `DoubleEntryPoint.delegateTransfer` method.

## Running the Script
```{bash}
npx hardhat run scripts/hack.js --network goerli
```

## Testing
To test the solution, the `scripts/hack.js` script can be run on a fork of the Goerli testnet:
```{bash}
npx hardhat run scripts/hack.js --network hardhat
```
