//SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.1;

contract Ownable {
    address public _owner;

    constructor() {
        _owner = msg.sender;
    }

    modifier onlyOwner() {
        require(isOwner(), "Can only be called by the owner!");
        _;
    }

    function isOwner() public view returns(bool) {
        return (msg.sender == _owner);
    }
}