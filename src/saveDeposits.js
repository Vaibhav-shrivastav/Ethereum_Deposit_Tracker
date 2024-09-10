const Deposit = require("../models/Deposit");
const logger = require("./logger");

async function saveDepositDetails(deposit) {
  try {
    if (!deposit.blockNumber || !deposit.hash) {
      throw new Error("Missing required deposit details");
    }

    console.log("Deposit Object: ", deposit);

    // Since blockTimestamp, gasPrice, gasLimit, and fee have already been processed in fetchDeposits.js
    const newDeposit = new Deposit({
      blockNumber: deposit.blockNumber,
      blockTimestamp: deposit.blockTimestamp,  // Use pre-processed block timestamp
      fee: deposit.fee,  // Use pre-calculated fee from fetchDeposits.js
      hash: deposit.hash,
      pubkey: deposit.pubkey,  // Use the pubkey (assumed to be 'from')
    });

    console.log("Value:", deposit.value);
    console.log("Fee:", deposit.fee);


    // Save the deposit details to MongoDB
    await newDeposit.save();
    logger.info("Deposit details saved successfully.");
  } catch (error) {
    logger.error(`Error saving deposit details to MongoDB: ${error.message}`);
  }
}

module.exports = { saveDepositDetails };
