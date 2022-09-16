# Re-entrancy

The files in this directory provide the solution to the "Re-entrancy" level.

## Solution
The `Reentrancy` contract can be drained of funds using a re-entrancy attack. First, the `donate` method needs to be called as the `withdraw` method (where the re-entrancy attach will occur) will not run unless there is a balance greater than or equal to the amount being withdrawn. The re-entrancy attack occurs when the funds are withdrawn to the `msg.sender` before updating the internal balances.

## Running the Script
```{bash}
npx hardhat run scripts/hack.js --network rinkeby
```

## Testing
To test the solution, the `scripts/hack.js` script can be run on a fork of the Rinkeby testnet:
```{bash}
npx hardhat run scripts/hack.js --network hardhat
```
