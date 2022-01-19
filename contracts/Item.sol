//SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.1;

import "./ItemManager.sol";

contract Item {
    uint public priceInWei;
    uint public totalPayments;
    uint public index;

    ItemManager parentContract;

    constructor(ItemManager _parentContract, uint _priceInWei, uint _index) {
        priceInWei = _priceInWei;
        index = _index;
        parentContract = _parentContract;
    }

    receive() external payable {
        require(priceInWei == msg.value, "Only full payments allowed");
        totalPayments += msg.value;
        //because there's no return values for triggerPayment(), we only get a bool success value
        (bool success, ) = address(parentContract).call{value: msg.value}(abi.encodeWithSignature("triggerPayment(uint256,address)", index, msg.sender));
        require(success, "The transaction wasn't successful, cancelling");
    }

}