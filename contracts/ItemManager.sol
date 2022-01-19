//SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.1;

import "./Ownable.sol";
import "./Item.sol";

contract ItemManager is Ownable {
    event itemEvent(uint _itemIndex, uint _step, address _itemAddress, string _description);

    enum SupplyChainSteps { Created, Purchased, Delivered }

    struct S_Item {
        Item _item;
        uint timesPurchased;
        uint priceInWei;
        uint id;
        string identifier;
        string description;
        string imageUrl;
    }

    S_Item[] public allItems;

    mapping(uint => S_Item) public items;
    uint index;

    mapping(address => S_Item[]) public myOrders;

    function getAllOrders(address _address) public view returns (S_Item[] memory) {
        return myOrders[_address];
    }

    function getAllItems() public view returns (S_Item[] memory) {
        return allItems;
    }
    
    function getOneItem(uint _index) public view returns (S_Item memory) {
        return items[_index];
    }
    
    function createItem(string memory _identifier, uint _priceInWei, string memory _description, string memory _imageUrl) public onlyOwner {
        Item item = new Item(this, _priceInWei, index);
        items[index]._item = item;
        items[index].id = index;
        items[index].identifier = _identifier;
        items[index].priceInWei = _priceInWei;
        items[index].description = _description;
        items[index].imageUrl = _imageUrl;
        allItems.push(items[index]);
        index++;
        emit itemEvent(index, uint(SupplyChainSteps.Created), address(item), string(items[index].description));
    }

    function triggerPayment(uint _index, address _buyer) public payable {
        Item item = items[_index]._item;
        require(address(item) == msg.sender, "Only items are allowed to update themselves, buddy boy!");
        require(msg.value == items[_index].priceInWei, "Pay up, buddy boy!");
        allItems[_index].timesPurchased++;
        items[_index].timesPurchased++;
        myOrders[_buyer].push(items[_index]);
        emit itemEvent(index, uint(SupplyChainSteps.Purchased), address(item), string(items[index].description));
    }
    
}