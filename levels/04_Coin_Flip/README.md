# Coin Flip

The files in this directory provide the solution to the "Coin Flip" level.

## Solution
The `CoinFlip` contract determines the `side` as a function of the blockhash of the previous block. More specifically, it:
1. Converts the blockhash of the previous block into a `uint256`
2. Divides by the `FACTOR` instance variable of the `CoinFlip` contract
3. The `side` is true if this value is 1 and is false otherwise

Within the `flip` function, there is a restriction that prevents the function from being called more than once per block. Thus, to complete the level we must call the function at different blocks. The `_guess` input value to the `flip` function can exactly mirror the calculation of `side` done within the `flip` function. This can be done within a contract to ensure that the correct block hash is used.

__Note:__ The `CoinFlipSolver` inherits from the OpenZeppelin `Ownable` contract to allow for updating the level instance.

## Running the Script
```{bash}
npx hardhat run scripts/hack.js --network rinkeby
```

## Testing
To test the solution, the `scripts/hack.js` script can be run on a fork of the Rinkeby testnet:
```{bash}
npx hardhat run scripts/hack.js --network hardhat
```
