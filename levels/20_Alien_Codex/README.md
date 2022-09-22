# Alien Codex

The files in this directory provide the solution to the "Alien Codex" level.

## Solution
- Since the `codex` array is a dynamic size array, it can be used to set any variable in storage in the contract (including `owner`).
- Only array elements between 0 and `codex.length - 1` can be set, calling `retract` allows setting any element since the array will have length `2**256 - 1`.
- The `owner` variable is stored at slot 0

## Running the Script
```{bash}
npx hardhat run scripts/hack.js --network rinkeby
```

## Testing
To test the solution, the `scripts/hack.js` script can be run on a fork of the Rinkeby testnet:
```{bash}
npx hardhat run scripts/hack.js --network hardhat
```
