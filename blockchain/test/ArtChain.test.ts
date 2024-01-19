import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ArtChain", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const artChain = await ethers.getContractFactory("ArtChain");
    const ArtChain = await artChain.deploy();

    const artChainNFT = await ethers.getContractFactory("ArtChainNFT");
    const ArtChainNFT = await artChainNFT.deploy();
    const addressNFT = ArtChainNFT.getAddress();

    const artChainNFT2 = await ethers.getContractFactory("ArtChainNFT2");
    const ArtChainNFT2 = await artChainNFT2.deploy();
    const addressNFT2 = ArtChainNFT2.getAddress();

    return {
      ArtChain,
      ArtChainNFT,
      ArtChainNFT2,
      owner,
      otherAccount,
      addressNFT,
      addressNFT2,
    };
  }

  it("Should create market items (ERC721)", async function () {
    const { ArtChain, ArtChainNFT, addressNFT } = await loadFixture(
      deployFixture
    );
    const listingPrice = ethers.parseUnits("1", "ether");
    const auctionPrice = ethers.parseUnits("10", "ether");

    await ArtChainNFT.safeMint("metadata");
    await ArtChainNFT.approve(ArtChain.getAddress(), 1);
    await ArtChain.createMarketItem(auctionPrice, addressNFT, 1, {
      value: listingPrice,
    });

    expect((await ArtChain.marketItems(1)).tokenId).to.equal(1);
  });
  it("Should create market items (ERC1155)", async function () {
    const { ArtChain, ArtChainNFT2, addressNFT2, owner } = await loadFixture(
      deployFixture
    );
    const listingPrice = ethers.parseUnits("1", "ether");
    const auctionPrice = ethers.parseUnits("10", "ether");

    await ArtChainNFT2.mint(10, "metadata");

    await ArtChainNFT2.setApprovalForAll(ArtChain.getAddress(), true);

    await ArtChain.createMarketItem(auctionPrice, addressNFT2, 1, {
      value: listingPrice,
    });

    expect((await ArtChain.marketItems(1)).tokenId).to.equal(1);
  });

  it("Should not create market (greather than 0)", async function () {
    const { ArtChain, ArtChainNFT, addressNFT } = await loadFixture(
      deployFixture
    );
    const listingPrice = ethers.parseUnits("1", "ether");
    const auctionPrice = ethers.parseUnits("0", "ether");

    await ArtChainNFT.safeMint("metadata");
    await ArtChainNFT.approve(ArtChain.getAddress(), 1);

    await expect(
      ArtChain.createMarketItem(auctionPrice, addressNFT, 1, {
        value: listingPrice,
      })
    ).to.be.revertedWith("The price must be greather than 0");
  });

  it("Should not create market (listing price)", async function () {
    const { ArtChain, ArtChainNFT, addressNFT } = await loadFixture(
      deployFixture
    );
    const listingPrice = ethers.parseUnits("0", "ether");
    const auctionPrice = ethers.parseUnits("10", "ether");

    await ArtChainNFT.safeMint("metadata");
    await ArtChainNFT.approve(ArtChain.getAddress(), 1);

    await expect(
      ArtChain.createMarketItem(auctionPrice, addressNFT, 1, {
        value: listingPrice,
      })
    ).to.be.revertedWith("The cost of listing price is 0.01 Matic");
  });
  it("Should created a sale (ERC721)", async function () {
    const { ArtChain, ArtChainNFT, addressNFT, otherAccount } =
      await loadFixture(deployFixture);
    const listingPrice = ethers.parseUnits("1", "ether");
    const auctionPrice = ethers.parseUnits("10", "ether");

    await ArtChainNFT.safeMint("metadata");
    await ArtChainNFT.approve(ArtChain.getAddress(), 1);
    await ArtChain.createMarketItem(auctionPrice, addressNFT, 1, {
      value: listingPrice,
    });

    const instance = ArtChain.connect(otherAccount);

    await instance.createMarketSale(addressNFT, 1, { value: auctionPrice });

    const owner = await ArtChainNFT.ownerOf(1);
    const marketItem = await ArtChain.fetchMarketItems();

    expect(owner).to.equal(otherAccount.address);
    expect(marketItem.length).to.equal(0);
  });
  it("Should created a sale (ERC1155)", async function () {
    const { ArtChain, ArtChainNFT2, addressNFT2, otherAccount, owner } =
      await loadFixture(deployFixture);
    const listingPrice = ethers.parseUnits("1", "ether");
    const auctionPrice = ethers.parseUnits("10", "ether");

    await ArtChainNFT2.mint(10, "metadata");

    await ArtChainNFT2.setApprovalForAll(ArtChain.getAddress(), true);
    let marketItem = await ArtChain.fetchMarketItems();

    await ArtChain.createMarketItem(auctionPrice, addressNFT2, 1, {
      value: listingPrice,
    });

    const instance = ArtChain.connect(otherAccount);

    await instance.createMarketSale(addressNFT2, 1, { value: auctionPrice });

    const ownerBuyed = await ArtChainNFT2.balanceOf(
      otherAccount.getAddress(),
      1
    );

    marketItem = await ArtChain.fetchMarketItems();

    expect(ownerBuyed).to.equal(1);
    expect(marketItem.length).to.equal(0);
  });
  it("Should not created a sale (price)", async function () {
    const { ArtChain, ArtChainNFT, addressNFT, otherAccount } =
      await loadFixture(deployFixture);
    const listingPrice = ethers.parseUnits("1", "ether");
    const auctionPrice = ethers.parseUnits("10", "ether");

    await ArtChainNFT.safeMint("metadata");
    await ArtChainNFT.approve(ArtChain.getAddress(), 1);
    await ArtChain.createMarketItem(auctionPrice, addressNFT, 1, {
      value: listingPrice,
    });

    const instance = ArtChain.connect(otherAccount);

    await expect(
      instance.createMarketSale(addressNFT, 1, { value: listingPrice })
    ).to.be.revertedWith(
      "Please submit the asking price in order to complete purchase"
    );
  });

  it("Should fetch items", async function () {
    const { ArtChain, ArtChainNFT, addressNFT } = await loadFixture(
      deployFixture
    );
    const listingPrice = ethers.parseUnits("1", "ether");
    const auctionPrice = ethers.parseUnits("10", "ether");

    await ArtChainNFT.safeMint("metadata");
    await ArtChainNFT.approve(ArtChain.getAddress(), 1);
    await ArtChain.createMarketItem(auctionPrice, addressNFT, 1, {
      value: listingPrice,
    });
    const marketItems = await ArtChain.fetchMarketItems();

    expect(marketItems.length).to.equal(1);
  });

  it("Should fetch my items", async function () {
    const { ArtChain, ArtChainNFT, addressNFT, otherAccount } =
      await loadFixture(deployFixture);
    const listingPrice = ethers.parseUnits("1", "ether");
    const auctionPrice = ethers.parseUnits("10", "ether");

    await ArtChainNFT.safeMint("metadata");
    await ArtChainNFT.safeMint("metadata2");
    await ArtChainNFT.approve(ArtChain.getAddress(), 1);
    await ArtChainNFT.approve(ArtChain.getAddress(), 2);

    await ArtChain.createMarketItem(auctionPrice, addressNFT, 1, {
      value: listingPrice,
    });
    await ArtChain.createMarketItem(auctionPrice, addressNFT, 2, {
      value: listingPrice,
    });

    const instance = ArtChain.connect(otherAccount);

    await instance.createMarketSale(addressNFT, 2, { value: auctionPrice });

    const myNFTs = await instance.fetchMyNfts();

    expect(myNFTs.length).to.equal(1);
    expect(myNFTs[0].itemId).to.equal(2);
  });

  it("Should fetch my created items", async function () {
    const { ArtChain, ArtChainNFT, addressNFT } = await loadFixture(
      deployFixture
    );
    const listingPrice = ethers.parseUnits("1", "ether");
    const auctionPrice = ethers.parseUnits("10", "ether");

    await ArtChainNFT.safeMint("metadata");
    await ArtChainNFT.safeMint("metadata2");
    await ArtChainNFT.approve(ArtChain.getAddress(), 1);
    await ArtChainNFT.approve(ArtChain.getAddress(), 2);
    await ArtChain.createMarketItem(auctionPrice, addressNFT, 1, {
      value: listingPrice,
    });
    await ArtChain.createMarketItem(auctionPrice, addressNFT, 2, {
      value: listingPrice,
    });

    const createdItems = await ArtChain.fetchItemsCreated();

    expect(createdItems.length).to.equal(2);
  });
});
