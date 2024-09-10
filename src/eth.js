const { ethers } = require("ethers");
require("dotenv").config({ path: "../.env" });

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

module.exports = provider;
