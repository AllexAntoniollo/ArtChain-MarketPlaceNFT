import { ethers } from "hardhat";

async function main() {
  const NFTMarket = await ethers.getContractFactory("ArtChain");
  const nftMarket = await NFTMarket.deploy();

  await nftMarket.waitForDeployment();
  const marketAddress = await nftMarket.getAddress();

  console.log(`ArtChain deployed to ${marketAddress}`);

  const NFTCollection = await ethers.getContractFactory("ArtChainNFT");
  const nftCollection = await NFTCollection.deploy(marketAddress);

  await nftCollection.waitForDeployment();
  const collectionAddress = await nftCollection.getAddress();

  console.log(`ArtChainNFT deployed to ${collectionAddress}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
