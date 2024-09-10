require("dotenv").config({ path: "../.env" });

const { AlchemyProvider } = require("@ethersproject/providers");
const { ethers } = require("ethers");

const provider = new AlchemyProvider("homestead", process.env.ALCHEMY_API_KEY);

const BEACON_DEPOSIT_CONTRACT = process.env.BEACON_DEPOSIT_CONTRACT
  ? process.env.BEACON_DEPOSIT_CONTRACT.toLowerCase()
  : null;

if (!BEACON_DEPOSIT_CONTRACT) {
  throw new Error(
    "BEACON_DEPOSIT_CONTRACT environment variable is not defined."
  );
}

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

    for (const txHash of block.transactions) {
      try {
        console.log("Checking transaction:", txHash);

        const tx = await provider.getTransaction(txHash);
        if (!tx) {
          console.log("Transaction not found:", txHash);
          continue;
        }

        if (tx.to && tx.to.toLowerCase() === BEACON_DEPOSIT_CONTRACT) {
          console.log("Deposit Transaction:", tx);

          depositTransactions.push({
            hash: tx.hash,
            from: tx.from,
            to: tx.to,
            value: ethers.formatEther(tx.value.toString()),
            gasPrice: ethers.formatUnits(tx.gasPrice.toString(), "gwei"),
            gasLimit: tx.gasLimit.toString(),
            blockNumber: tx.blockNumber,
            blockHash: tx.blockHash,
            blockTimestamp: new Date(block.timestamp * 1000).toISOString(),
            pubkey: tx.from,
            fee: ethers.formatEther(tx.gasPrice.mul(tx.gasLimit).toString()),
          });
        } else {
        }
      } catch (txError) {
        console.error(
          `Error checking transaction details for ${txHash}: ${txError.message}`
        );
      }
    }

    return depositTransactions;
  } catch (error) {
    console.error(`Error fetching deposit transactions: ${error.message}`);
    throw error;
  }
};

module.exports = { getDepositTransactions };
