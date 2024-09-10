const ethers = require("ethers");
const { AlchemyProvider } = require("@ethersproject/providers");
const Deposit = require("../models/Deposit");
const logger = require("./logger");
require("dotenv").config({ path: "../.env" });

const provider = new AlchemyProvider("homestead", process.env.ALCHEMY_API_KEY);

async function saveDepositDetails(deposit) {
  try {
    if (!deposit.blockNumber || !deposit.hash) {
      throw new Error("Missing required deposit details");
    }

    console.log("Deposit Object: ", deposit);

    const block = await provider.getBlock(deposit.blockNumber);
    const blockTimestamp = new Date(block.timestamp * 1000);

    if (!deposit.gasPrice || !deposit.gasLimit) {
      throw new Error("Missing gasPrice or gasLimit in deposit transaction");
    }

    console.log("Gas Price: ", deposit.gasPrice.toString());
    console.log("Gas Limit: ", deposit.gasLimit.toString());

    const gasPriceBigNumber = ethers.BigNumber.from(deposit.gasPrice);
    const gasLimitBigNumber = ethers.BigNumber.from(deposit.gasLimit);

    const feeInWei = gasPriceBigNumber.mul(gasLimitBigNumber);
    const fee = ethers.formatEther(feeInWei);

    const newDeposit = new Deposit({
      blockNumber: deposit.blockNumber,
      blockTimestamp: blockTimestamp,
      fee: fee,
      hash: deposit.hash,
      pubkey: deposit.from,
    });

    await newDeposit.save();
    logger.info("Deposit details saved successfully.");
  } catch (error) {
    logger.error(`Error saving deposit details to MongoDB: ${error.message}`);
  }
}

module.exports = { saveDepositDetails };
