const { AlchemyProvider } = require("@ethersproject/providers");
const { ethers } = require("ethers");
require("dotenv").config({ path: "../.env" });

const provider = new AlchemyProvider("homestead", process.env.ALCHEMY_API_KEY);

const getDepositTransactions = async () => {
  try {
    console.log("Fetching latest block number...");
    const latestBlock = await provider.getBlockNumber();
    console.log("Latest Block Number:", latestBlock);

    console.log("Fetching block details...");
    const block = await provider.getBlock(latestBlock, true);

    if (!block || !block.transactions) {
      console.log("No transactions found in the block.");
      return [];
    }

    console.log("Transactions:", block.transactions);

    const depositTransactions = [];

    let temp = "";

    for (const txHash of block.transactions) {
      try {
        console.log("Fetching transaction details for:", txHash);
        const tx = await provider.getTransaction(txHash);
        temp = tx;
        if (
          tx &&
          tx.to &&
          tx.to.toLowerCase() ===
            process.env.BEACON_DEPOSIT_CONTRACT.toLowerCase()
        ) {
          depositTransactions.push(tx);
          console.log("Deposit Transaction:", tx);
        } else {
          console.log("Non-deposit Transaction:", tx.to);
        }
      } catch (txError) {
        console.error(
          `Error fetching transaction details for ${txHash}: ${txError.message}`
        );
      }
    }
    depositTransactions.push(temp);
    console.log(temp);

    return depositTransactions;
  } catch (error) {
    console.error(`Error fetching deposit transactions: ${error.message}`);
    throw error;
  }
};

module.exports = { getDepositTransactions };
