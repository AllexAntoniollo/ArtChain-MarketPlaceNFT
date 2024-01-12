/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MARKETPLACE_ADDRESS: process.env.MARKETPLACE_ADDRESS,
    ERC721: process.env.ERC721,
    ERC1155: process.env.ERC1155,
    CHAIN_ID: process.env.CHAIN_ID,
  },
  images: {
    remotePatterns: [
      {
        hostname: "picsum.photos",
      },
    ],
  },
};
module.exports = nextConfig;
