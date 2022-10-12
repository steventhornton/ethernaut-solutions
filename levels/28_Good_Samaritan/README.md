# Good Samaritan

The files in this directory provide the solution to the "Good Samaritan" level.

## Solution
- When requesting a donation, the `Coin` contract calls the `notify(uint256)` function on the contract that the donation will be sent to (only if the donation will be sent to a contract). This `notify` function can be setup to raise a `NotEnoughBalance` error causing the `GoodSamaritan` to transfer all `Coin` to the malicious contract.

## Running the Script
```{bash}
npx hardhat run scripts/hack.js --network goerli
```

## Testing
To test the solution, the `scripts/hack.js` script can be run on a fork of the Goerli testnet:
```{bash}
npx hardhat run scripts/hack.js --network hardhat
```
