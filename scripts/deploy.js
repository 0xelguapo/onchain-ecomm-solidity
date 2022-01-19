async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const ItemContractFactory = await hre.ethers.getContractFactory("ItemManager");
    const itemer = await ItemContractFactory.deploy();
    await itemer.deployed();

    let sweater = "https://images.unsplash.com/photo-1610901157620-340856d0a50f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1665&q=80";
    let poncho = "https://images.unsplash.com/photo-1578078910900-78f443b2f84d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
    let shirt = "https://images.unsplash.com/photo-1456885284447-7dd4bb8720bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
    let yogapants = "https://images.unsplash.com/photo-1485727749690-d091e8284ef3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80";
    let createItem;
    let getAllItems;

    createItem = await itemer.createItem("Sweater", 2000, "A sweater to keep you warm during turbulent times.", sweater);
    await createItem.wait();

    createItem = await itemer.createItem("Poncho", 2500, "Ponchos are great for the cold. Pacha style.", poncho);
    await createItem.wait();

    createItem = await itemer.createItem("Good Luck Shirt", 1200, "A cool red shirt for you to wear. Red is good luck in Chinese culture!", shirt);
    await createItem.wait();

    createItem = await itemer.createItem("WAGMI Yoga Pants", 2000, "These aren't just regular yoga pants. They're symbolic.", yogapants);
    await createItem.wait();

    getAllItems = await itemer.getAllItems();
    await getAllItems;

    console.log("All Items", getAllItems);
    console.log("ItemManager contract deployed to:", itemer.address);
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