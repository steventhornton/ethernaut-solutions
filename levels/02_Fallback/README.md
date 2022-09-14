# Fallback

The files in this directory provide the solution to the "Fallback" level.

## Solution
1. Call the `contribute` method on the contract with a value of 1 wei (or any non-zero amount of ether). This is required as the `receive` method has a requirement that `contributions[msg.sender] > 0`.
1. Send 1 wei (or any amount of ether) to the contract. In the `receive` method, this will set the owner of the contract to `msg.sender`.
2. Call the `withdraw` method on the contract to withdraw all ether.

## Running the Script
```{bash}
npx hardhat run scripts/hack.js --network rinkeby
```

## Testing
To test the solution, the `scripts/hack.js` script can be run on a fork of the Rinkeby testnet:
```{bash}
npx hardhat run scripts/hack.js --network hardhat
```
