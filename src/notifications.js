const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config({ path: "../.env" });

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

const sendTelegramAlert = (deposit) => {
  const message = `New deposit detected: ${deposit.hash}`;
  bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message);
};

module.exports = { sendTelegramAlert };
