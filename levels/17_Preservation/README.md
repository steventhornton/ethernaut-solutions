# Preservation

The files in this directory provide the solution to the "Preservation" level.

## Solution
- By using `delegatecall`, the functionality of `timeZone1Library` and `timeZone2Library` will run in the context of `Preservation`. Thus, the `storedTime` value in `LibraryContract` will actually write to the `timeZone1Library` value in `Preservation`. This can be exploited to set `timeZone1Library` to be a malicious contract that will overwrite the `owner` value. By aligning the storage slots such that `owner` is overwritten, ownership can be taken.

## Running the Script
```{bash}
npx hardhat run scripts/hack.js --network rinkeby
```

## Testing
To test the solution, the `scripts/hack.js` script can be run on a fork of the Rinkeby testnet:
```{bash}
npx hardhat run scripts/hack.js --network hardhat
```
