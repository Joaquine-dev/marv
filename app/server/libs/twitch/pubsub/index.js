const { EventSubWsListener } = require("@twurple/eventsub-ws");
const loggers = require("../../../libs/loggers");
const onRedemption = require("./onRedemption");
const onBits = require("./onBits");
const twitch = require("../index");
const state = require("../state");
const login = require("../login");

let eventSubListener = null;
let connectId = null;
let maxReconnect = 10;
let reconnectCount = 0;
let reconnectDelay = 2; // seconds

let pendingConnection = {
  resolve: null,
  reject: null,
};

const logger = loggers.get("twitch");

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function reconnect() {
  const delay = getRandomInt(1000);
  connectId && clearTimeout(connectId);
  logger.info(`[eventsub] reconnect in ${reconnectDelay} s`);
  connectId = setTimeout(_connect, reconnectDelay * 1000 + delay);
  reconnectDelay *= 2;
}

async function _connect() {
  const { resolve, reject } = pendingConnection;

  try {
    // Clean up existing listener if any
    if (eventSubListener) {
      eventSubListener.stop();
      eventSubListener = null;
    }

    // Create EventSub WebSocket listener
    eventSubListener = new EventSubWsListener({
      apiClient: twitch.api,
    });

    // Get the authenticated user (already connected via login)
    const user = await login();
    const userId = user.id;

    // Subscribe to channel point redemptions
    eventSubListener.onChannelRedemptionAdd(userId, onRedemption);

    // Subscribe to bits (cheers)
    eventSubListener.onChannelCheer(userId, onBits);

    // Handle disconnection
    eventSubListener.onUserSocketDisconnect((userId, error) => {
      logger.warn(`[eventsub] Disconnected: ${error?.message || "unknown"}`);
      state.set("pubsub.connected", false);
      if (reconnectCount < maxReconnect) {
        reconnectCount++;
        reconnect();
      }
    });

    // Start the listener
    await eventSubListener.start();

    state.set("pubsub.connected", true);
    state.set("pubsub.connecting", false);
    reconnectCount = 0;
    reconnectDelay = 2;
    resolve({ label: "eventsub", message: "connected" });
  } catch (error) {
    logger.error(`[eventsub] ${error.stack}`);
    state.set("error", { label: "eventsub", message: error.message });

    if (reconnectCount >= maxReconnect) {
      const message = `Too many reconnection failures (max:${maxReconnect})`;
      const errorObj = { label: "eventsub", message };
      state.set("pubsub.connecting", false);
      state.set("pubsub.connected", false);
      logger.error(`[eventsub] ${message}`);
      state.set("error", errorObj);
      reject(errorObj);
      return;
    }

    reconnectCount++;
    reconnect();
  }
}

function connect() {
  if (state.get("pubsub.connected")) {
    return Promise.resolve({ connected: true });
  }

  if (state.get("pubsub.connecting")) {
    return Promise.resolve({ connecting: true });
  }

  state.set("pubsub.connecting", true);
  state.set("error", null);

  return new Promise((resolve, reject) => {
    pendingConnection = { resolve, reject };
    reconnectCount = 0;
    reconnectDelay = 2;
    connectId = null;
    _connect();
  });
}

module.exports = connect;
