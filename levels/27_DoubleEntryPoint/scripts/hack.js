const { ethers } = require("hardhat");
const hre = require("hardhat");


async function solve(instance_address, account) {

    const Bot = await ethers.getContractFactory("Bot");
    const DoubleEntryPoint = await ethers.getContractFactory("DoubleEntryPoint");
    const Forta = await ethers.getContractFactory("Forta");

    // DET token
    const token = DoubleEntryPoint.attach(instance_address);
    
    // Deploy the bot
    const vault_address = await token.cryptoVault();
    const bot = await Bot.deploy(vault_address);
    await bot.deployed();

    const forta_address = await token.forta();
    const forta = Forta.attach(forta_address);

    // Register the bot
    let tx = await forta.setDetectionBot(bot.address);
    await tx.wait(5);

    console.log("Sucess!!");

}


async function main() {

    const [account] = await ethers.getSigners();
    console.log(`Account address: ${account.address}`);
    console.log('');

    instance_address = '0x7a3Cdc90A1ede1c9c22df884655230839B73fC9A';

    await solve(instance_address, account);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
