const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ItemManager", function () {
  it("Should create a new item", async function () {
    const ItemManagerFactory = await ethers.getContractFactory("ItemManager");
    const itemer = await ItemManagerFactory.deploy();
    await itemer.deployed();

    expect(await itemer.connnect(owner).createItem('Merch', 1000))

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
