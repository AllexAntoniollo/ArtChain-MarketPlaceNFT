import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ArtChainNFT", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const artChainNFT = await ethers.getContractFactory("ArtChainNFT");
    const ArtChainNFT = await artChainNFT.deploy();

    return {
      ArtChainNFT,
      owner,
      otherAccount,
    };
  }

  it("Should mint", async function () {
    const { ArtChainNFT } = await loadFixture(deployFixture);

    await ArtChainNFT.safeMint("metadata");

    await expect(await ArtChainNFT.tokenURI(0)).to.equal(
      "https://amaranth-occasional-crane-340.mypinata.cloud/ipfs/QmU4brx9ooQs8iYdSDDuXkoaY61w6cpHZZn4Ku9Q3LtKCN/metadata"
    );
  });

  it("Should supports interface", async function () {
    const { ArtChainNFT, otherAccount, owner } = await loadFixture(
      deployFixture
    );

    expect(await ArtChainNFT.supportsInterface("0x80ac58cd")).to.equal(
      true,
      "Can't support interface"
    );
  });

  it("Should increase balance", async function () {
    const { ArtChainNFT, otherAccount, owner } = await loadFixture(
      deployFixture
    );

    await ArtChainNFT.safeMint("metadata");
    await ArtChainNFT.safeMint("metadata2");

    expect(await ArtChainNFT.balanceOf(owner)).to.equal(2);
  });
});
