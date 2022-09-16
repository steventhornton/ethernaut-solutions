# Elevator

The files in this directory provide the solution to the "Elevator" level.

## Solution
The `Elevator` contract assumes the `msg.sender` is an instance of the `Building` contract. By creating a contract that implements a `isLastFloor` function (as in the `Building` contract), and calling the `goTo` function, the `top` value in the `Elevator` contract can be set to `true`. Since the `goTo` function is called twice, the contract that exploits `Elevator` can return different values each time it is called. 

## Running the Script
```{bash}
npx hardhat run scripts/hack.js --network rinkeby
```

## Testing
To test the solution, the `scripts/hack.js` script can be run on a fork of the Rinkeby testnet:
```{bash}
npx hardhat run scripts/hack.js --network hardhat
```
