# Ethereum Deposit Tracker

This project tracks Ethereum deposits on the Beacon Deposit Contract and provides metrics for visualization using Prometheus and Grafana.

## Table of Contents

1. [Project Description](#project-description)
2. [Prerequisites](#prerequisites)
3. [Setup Instructions](#setup-instructions)
4. [Configuration](#configuration)
5. [Running the Application](#running-the-application)

## Project Description

This project tracks Ethereum deposits on the Beacon Deposit Contract. It collects deposit data, saves it to MongoDB, and exposes metrics via Prometheus. Grafana is used for visualizing the data.

## Prerequisites

- Docker
- Docker Compose
- Node.js

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Vaibhav-shrivastav/luganodes-task
cd luganodes-task
```

### 2. Create a .env File

Create a .env file in the root directory of the project with the following variables:

```bash
RPC_URL=https://eth-mainnet.alchemyapi.io/v2/your_api_key
BEACON_DEPOSIT_CONTRACT=0x00000000219ab540356cBB839Cbe05303d7705Fa
METRICS_PORT=9091
TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID=YOUR_TELEGRAM_CHAT_ID
ALCHEMY_API_KEY=YOUR_ALCHEMY_API_KEY
MONGODB_URI=mongodb://localhost:27017
```

Replace placeholders with your actual credentials and settings.

### 3. Build and Run Docker Containers

Use Docker Compose to build and start all services:

```bash
docker-compose up --build
```

This will start the following services:

- MongoDB
- Grafana
- Prometheus
- MongoDB Exporter
- Your Ethereum Deposit Tracking Application

### 4. Access the Services

- Grafana: Open `http://localhost:3000` in your web browser. Log in with the default credentials `(admin/admin)` and set up the Prometheus data source.
- Prometheus: Open `http://localhost:9090` to view and query metrics.
- Metrics Endpoint: Access your application’s metrics at `http://localhost:9091/metrics`

### 5. Configure Grafana Dashboards

1. **Add Prometheus Data Source:**
   - Go to Configuration (gear icon) -> Data Sources.
   - Click Add data source and select Prometheus.
   - Set the URL to `http://prometheus:9090` and click Save & Test.
2. **Create Dashboards:**
   - Go to Dashboards -> New Dashboard.
   - Add a new panel for each visualization:
     - Deposit Count Over Time: Use a Time Series panel with the query `eth_deposit_count`.
     - Deposit Fee Distribution: Use a Histogram or Bar Chart panel with the query `eth_deposit_fee`.

## Configuration

- Metrics Port: Configurable via the `.env` file.
- Telegram Alerts: Set your Telegram bot token and chat ID in the `.env` file.

## Running the Application

The application runs as a Docker container and will automatically start with Docker Compose.

## Telegram Bot Screenshot

Here is a screenshot of the Telegram bot functionality:
- Notifies when deposit transaction is detected.

![Telegram Bot Screenshot](./assets/telegram_alert.png)


