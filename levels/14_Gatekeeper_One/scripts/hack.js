const { ethers } = require("hardhat");
const hre = require("hardhat");


async function solve(instance_address, account) {

    const HackGatekeeperOne = await ethers.getContractFactory("HackGatekeeperOne");

    // Deploy HackGatekeeperOne
    console.log('Deploying the HackGatekeeperOne contract');
    contract = await HackGatekeeperOne.deploy();
    await contract.deployed();
    console.log(`Contract address: ${contract.address}`);

    // 1. msg.sender != tx.origin
    //    Call from a contract
    //
    // 2. gasleft().mod(8191) == 0
    //    Test with a range of gas limit values until success
    // 
    // 3. uint32(uint64(_gateKey)) == uint16(uint64(_gateKey))
    //    Must be of the form: XXXXXXXX0000XXXX
    //
    //    uint32(uint64(_gateKey)) != uint64(_gateKey)
    //    Must be non-zero in the first half
    //    
    //    uint32(uint64(_gateKey)) == uint16(tx.origin)
    //    Final 4 hex chars must match tx.origin
    //
    // Let gk = A + B + C + D where A, B, C, and D are each of length 4
    let A = '1000';
    let B = '0000';
    let C = '0000';
    let D = account.address.slice(38, 44);
    let gk = '0x' + A + B + C + D;
    console.log(gk);

    // Determine gas to use (uncomment in testing to confirm value)
    // let i = 0;
    // gas = 80000;
    // for (i = 0; i < 8198; i++) {
    //     try {
    //         await contract.hack(instance_address, gk, gas + i);
    //         break
    //     } catch (error) {};
    // }
    // gas_limit = gas + i;
    // console.log(`${gas + i} success!!`)
    gas_limit = 82164;

    console.log('Solving...');
    let tx = await contract.hack(instance_address, gk, gas_limit);
    console.log('Waiting for 10 confirmations...');
    await tx.wait(10);

    console.log('Success!');

}


async function main() {

    const [account] = await ethers.getSigners();
    console.log(`Account address: ${account.address}`);
    console.log('');

    instance_address = '0x87e9D1935d92024Ec2B0792fE40a6166b0Df9A32';

    await solve(instance_address, account);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
