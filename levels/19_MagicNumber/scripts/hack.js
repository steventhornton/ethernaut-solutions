const { ethers } = require("hardhat");
const hre = require("hardhat");


async function solve(instance_address, account) {

    const MagicNum = await ethers.getContractFactory("MagicNum");
    const contract = MagicNum.attach(instance_address);

    // PUSH1 0x2A
    // PUSH1 0x80
    // MSTORE
    // PUSH1 0x20
    // PUSH1 0x80
    // RETURN
    runtime_opcode = '0x602A60805260206080f3';

    // PUSH1 0x0x
    // PUSH1 0x0c
    // PUSH1 0x00
    // COPYCODE
    // PUSH1 0x0a
    // PUSH1 0x00
    // RETURN
    initialization_opcode = '0x600a600c600039600a6000f3602A60805260206080f3'

    let tx = await account.sendTransaction({
        data: initialization_opcode
    })
    console.log('Waiting for 10 confirmations');
    await tx.wait(10);
    
    let solution_address = (await ethers.provider.getTransactionReceipt(tx.hash)).contractAddress;
    console.log(solution_address);
    
    await contract.setSolver(solution_address);

    console.log('Success!');

}


async function main() {

    const [account] = await ethers.getSigners();
    console.log(`Account address: ${account.address}`);
    console.log('');

    instance_address = '0xC291D27Ad24a913F07ba2E9e35E483EF26A15d12';

    await solve(instance_address, account);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
