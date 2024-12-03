// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {STRINGUPDATION} from "../src/stringupdation.sol";

contract CounterScript is Script {
    STRINGUPDATION public deployment;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        deployment = new STRINGUPDATION();

        vm.stopBroadcast();
    }
}
