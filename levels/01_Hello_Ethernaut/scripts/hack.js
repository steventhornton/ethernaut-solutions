const { ethers } = require("hardhat");
const hre = require("hardhat");


async function solve(instance_address, account) {

    const Instance = await ethers.getContractFactory("Instance");

    let contract = Instance.attach(instance_address);

    const password = await contract.password();

    await contract.authenticate(password);

}


async function main() {

    const [account] = await ethers.getSigners();
    console.log(`Account address: ${account.address}`);
    console.log('');

    instance_address = '0x4a5518b6aC93DB3490167c6a31e56a36bFaEE9Ed';

    await solve(instance_address, account);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
