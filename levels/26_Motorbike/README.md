# Motorbike

The files in this directory provide the solution to the "Motorbike" level.

__Note:__ I have not been able to verify that this solution works on-chain as the rinkeby testnet has been depricated.

## Solution
- The `initialize` method can be called directly on the implementation contract. This will set the `upgrader` to be `msg.sender`.
- The `upgrateToAndCall` method can now be used to upgrade to a malicious contract. Since the `_upgrateToAndCall` method uses `delegatecall` on the new implementation contract, any code (`selfdestruct`) can be run.

## Running the Script
```{bash}
npx hardhat run scripts/hack.js --network rinkeby
```

## Testing
To test the solution, the `scripts/hack.js` script can be run on a fork of the Rinkeby testnet:
```{bash}
npx hardhat run scripts/hack.js --network hardhat
```
