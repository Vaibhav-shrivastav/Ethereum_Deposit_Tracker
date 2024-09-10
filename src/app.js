const ethers = require("ethers");
const { getDepositTransactions } = require("./fetchDeposits");
const { saveDepositDetails } = require("./saveDeposits");
const { sendTelegramAlert } = require("./notifications");
const connectDB = require("./db");
const logger = require("./logger");
const { depositGauge, depositFeeGauge } = require("./metrics");

connectDB();

const monitorDeposits = async () => {
  while (true) {
    try {
      const deposits = await getDepositTransactions();
      if (deposits.length === 0) {
        logger.info("No new deposits found.");
      } else {
        deposits.forEach((deposit) => {
          saveDepositDetails(deposit);
          sendTelegramAlert(deposit);

          depositGauge.inc();
          depositFeeGauge.set(ethers.formatEther(deposit.gasUsed));
        });
      }
    } catch (error) {
      logger.error(`Error in deposit monitoring: ${error.message}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 60000));
  }
};

monitorDeposits();
