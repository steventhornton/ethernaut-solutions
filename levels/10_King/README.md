# King

The files in this directory provide the solution to the "King" level.

## Solution
This level can be solved by setting the king to be a contract that does not accept payments. This will result in anyone trying to claim kingship to fail as `king.transfer(msg.value)` will fail.

## Running the Script
```{bash}
npx hardhat run scripts/hack.js --network rinkeby
```

## Testing
To test the solution, the `scripts/hack.js` script can be run on a fork of the Rinkeby testnet:
```{bash}
npx hardhat run scripts/hack.js --network hardhat
```
