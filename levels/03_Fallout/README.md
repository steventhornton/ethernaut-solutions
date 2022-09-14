# Fallout

The files in this directory provide the solution to the "Fallout" level.

## Solution
The constructor name is misspelled in the contract. The contract name is `Fallout` whereas the constructor name is `Fal1out` (note the 1). By calling the misspelled constructor, ownership can be taken on the contract since the function is public.

## Running the Script
```{bash}
npx hardhat run scripts/hack.js --network rinkeby
```

## Testing
To test the solution, the `scripts/hack.js` script can be run on a fork of the Rinkeby testnet:
```{bash}
npx hardhat run scripts/hack.js --network hardhat
```
