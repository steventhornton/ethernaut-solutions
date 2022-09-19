const { ethers } = require("hardhat");
const hre = require("hardhat");


async function solve(instance_address, account) {

    const HackGatekeeperTwo = await ethers.getContractFactory("HackGatekeeperTwo");

    // Deploy HackGatekeeperOne
    console.log('Deploying the HackGatekeeperTwo contract');
    contract = await HackGatekeeperTwo.deploy(instance_address);
    await contract.deployed();
    console.log(`Contract address: ${contract.address}`);

    console.log('Success!');

}


async function main() {

    const [account] = await ethers.getSigners();
    console.log(`Account address: ${account.address}`);
    console.log('');

    instance_address = '0x8F596BBBd38a8c841DC6A0f56B233494742D23bf';

    await solve(instance_address, account);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
