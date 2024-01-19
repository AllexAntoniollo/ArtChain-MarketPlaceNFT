import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ArtChainNFT2", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const artChainNFT = await ethers.getContractFactory("ArtChainNFT2");
    const ArtChainNFT = await artChainNFT.deploy();

    return {
      ArtChainNFT,
      owner,
      otherAccount,
    };
  }

  it("Should mint", async function () {
    const { ArtChainNFT, owner } = await loadFixture(deployFixture);

    await ArtChainNFT.mint(2, "metadata");

    expect(await ArtChainNFT.balanceOf(owner.address, 1)).to.equal(2);
  });
  it("Should get uri", async function () {
    const { ArtChainNFT } = await loadFixture(deployFixture);

    await ArtChainNFT.mint(2, "metadata");

    expect(await ArtChainNFT.uri(1)).to.equal("ipfs://metadata");
  });
});
