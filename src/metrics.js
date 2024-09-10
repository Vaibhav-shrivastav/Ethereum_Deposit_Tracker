const client = require("prom-client");
const express = require("express");
const app = express();

const depositGauge = new client.Gauge({
  name: "eth_deposit_count",
  help: "Total number of ETH deposits",
});

const depositFeeGauge = new client.Gauge({
  name: "eth_deposit_fee",
  help: "Fee for the last ETH deposit",
});

app.get("/metrics", (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.send(client.register.metrics());
});

const PORT = process.env.METRICS_PORT || 9091;
app.listen(PORT, () => {
  console.log(`Metrics server running on port ${PORT}`);
});

module.exports = { depositGauge, depositFeeGauge };
