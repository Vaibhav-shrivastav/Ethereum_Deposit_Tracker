const Deposit = require("../models/Deposit");
const logger = require("./logger");

async function saveDepositDetails(deposit) {
  try {
    if (!deposit.blockNumber || !deposit.hash) {
      throw new Error("Missing required deposit details");
    }

    const newDeposit = new Deposit({
      blockNumber: deposit.blockNumber,
      blockTimestamp: deposit.blockTimestamp,
      fee: deposit.fee,
      hash: deposit.hash,
      pubkey: deposit.pubkey,
    });

    await newDeposit.save();
    logger.info("Deposit details saved successfully");
  } catch (error) {
    logger.error(`Error saving deposit details to MongoDB: ${error.message}`);
  }
}

module.exports = { saveDepositDetails };
