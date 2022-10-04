# Puzzle Wallet

The files in this directory provide the solution to the "Puzzle Wallet" level.

## Solution
1. Call `proposeNewAdmin` on the proxy contract and set to attackers address. This will update the `owner` in the wallet contract as they share a storage slot.
2. Call `addToWhitelist` on the wallet contract with the attackers address as input. This will whitelist the attacker as the attacker is currently the owner.
3. The `multicall` function will only allow calling the `deposit` function once. This can be bypassed by calling the multicall function twice within the multicall function. This will also double count the deposited ETH as `msg.value` persists within `delegatecall`.
4. Drain the contract of all funds by calling `execute`.
5. `setMaxBalance` on the wallet contract can now be called (since the contract has a balance of 0) and since `maxBalance` in `PuzzleWallet` and `admin` in `PuzzleProxy` share a storage slot, this can be used to set the `admin`.

## Running the Script
```{bash}
npx hardhat run scripts/hack.js --network rinkeby
```

## Testing
To test the solution, the `scripts/hack.js` script can be run on a fork of the Rinkeby testnet:
```{bash}
npx hardhat run scripts/hack.js --network hardhat
```
