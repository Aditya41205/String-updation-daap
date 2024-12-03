// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.28;

import {Test} from "forge-std/Test.sol";
import {STRINGUPDATION} from "../src/stringupdation.sol";

contract teststringupadtion is Test{
 STRINGUPDATION stringupdation;
 address user= makeAddr("user");
 function setUp() external {
    stringupdation= new STRINGUPDATION();
    vm.deal(user, 1000 ether);
 }

 function testcontract() public {
    vm.prank(user);
    stringupdation.daap("akm");
     
    vm.prank(user);
    stringupdation.stringreturn();

    assertEq("akm", stringupdation.stringreturn());
 }
}