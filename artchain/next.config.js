/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MARKETPLACE_ADDRESS: process.env.MARKETPLACE_ADDRESS,
    ERC721: process.env.ERC721_ADDRESS,
    ERC1155: process.env.ERC1155_ADDRESS,
    CHAIN_ID: process.env.CHAIN_ID,
  },
  images: {
    remotePatterns: [
      {
        hostname: "picsum.photos",
        hostname: "pixabay.com",
      },
    ],
  },
};
module.exports = nextConfig;
