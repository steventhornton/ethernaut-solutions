# Privacy

The files in this directory provide the solution to the "Privacy" level.

## Solution
To find the valid `_key` to pass to the `unlock` method of the `Privacy` contract, we must determine the value of `data[2]`. This can be obtained using the `getStorageAt` method off-chain. The storage will combine the `flattening`, `denomination`, and `awkwardness` variables into a single slot. Thus, the value of `data[2]` will be in storage slot 5. Since the `unlock` function converts `data[2]` to `bytes16`, we must truncate the value of `data[2]` to fit into 16 bytes.

## Running the Script
```{bash}
npx hardhat run scripts/hack.js --network rinkeby
```

## Testing
To test the solution, the `scripts/hack.js` script can be run on a fork of the Rinkeby testnet:
```{bash}
npx hardhat run scripts/hack.js --network hardhat
```
