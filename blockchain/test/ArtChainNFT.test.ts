import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ArtChainNFT", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const artChain = await ethers.getContractFactory("ArtChain");
    const ArtChain = await artChain.deploy();
    const marketAddress = await ArtChain.getAddress();

    const artChainNFT = await ethers.getContractFactory("ArtChainNFT");
    const ArtChainNFT = await artChainNFT.deploy(marketAddress);
    const collectionAddress = await ArtChainNFT.getAddress();

    return {
      ArtChain,
      marketAddress,
      ArtChainNFT,
      collectionAddress,
      owner,
      otherAccount,
    };
  }

  it("Should ...", async function () {
    const { ArtChain, collectionAddress, ArtChainNFT } = await loadFixture(
      deployFixture
    );

    await expect(1).to.be.equal(1);
  });
});
