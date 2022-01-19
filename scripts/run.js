const hre = require("hardhat");

const main = async () => {
    const [owner, addr1, addr2] = await hre.ethers.getSigners();
    const itemContractFactory = await hre.ethers.getContractFactory("ItemManager");
    const itemer = await itemContractFactory.deploy();
    await itemer.deployed();

    console.log("Item Manager Contract Deployed to:", itemer.address);
    console.log("Owner Address:", owner.address);
    
    let createItem;
    let getAllItems;
    
    createItem = await itemer.createItem("Merch 1", 1000, "A sweater for the cold weather.", "randomurl");
    await createItem.wait();

    createItem = await itemer.createItem("Second Item", 1500, "A shirt for the hot weather.", "rando");
    await createItem.wait();

    getAllItems = await itemer.getAllItems();
    await getAllItems;
    console.log(getAllItems);

    
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

runMain();