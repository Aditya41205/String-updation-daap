// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

//deploying address = 0xD177F3162975474fCBa67cCf41ceE7C1e25bd4d9


contract STRINGUPDATION{
    string private _string;

    function daap(string memory string_) public{
        _string=string_;
    }

    function stringreturn() public view returns(string memory){
        return _string;
    }
}
