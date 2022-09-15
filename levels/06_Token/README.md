# Token

The files in this directory provide the solution to the "Token" level.

## Solution
The `Token` contract does subtraction on the unsigned integer `balances` values without any checks for underflow. By transfering the current balance of tokens plus one to another address, underflow occurs in the calculation `balances[msg.sender] - _value` which will return `uint256.max`. As a result, the balance of `msg.sender` will be `uint256.max` after calling `transfer`.

## Running the Script
```{bash}
npx hardhat run scripts/hack.js --network rinkeby
```

## Testing
To test the solution, the `scripts/hack.js` script can be run on a fork of the Rinkeby testnet:
```{bash}
npx hardhat run scripts/hack.js --network hardhat
```
