# Telephone

The files in this directory provide the solution to the "Telephone" level.

## Solution
The `Telephone` contract contains the `changeOwner` method that will set the owner of the contract to the input address only if the `tx.origin` value and `msg.sender` value are different. By calling the `changeOwner` method from within a contract, the `tx.origin` value will be the original address that created the transaction while the `msg.sender` value will be the address of the contract. Thus, a new address can be passed to the `changeOwner` method from within the deployed `HackTelephone` contract to change the owner to any address.

## Running the Script
```{bash}
npx hardhat run scripts/hack.js --network rinkeby
```

## Testing
To test the solution, the `scripts/hack.js` script can be run on a fork of the Rinkeby testnet:
```{bash}
npx hardhat run scripts/hack.js --network hardhat
```
