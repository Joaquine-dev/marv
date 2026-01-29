const state = require("../state");
const twitch = require("../index");

const loggers = require("../../../libs/loggers");
const settings = require("../../../libs/settings");
const chatJoin = require("../../../libs/twitch/chat/join");

let connectId = null;
let maxReconnect = 10;
let reconnectCount = 0;
let reconnectDelay = 2; // seconds

let pendingConnection = {
  resolve: null,
  reject: null,
  channel: null,
};

const logger = loggers.get("twitch");

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function reconnect() {
  const delay = getRandomInt(1000);
  connectId && clearTimeout(connectId);
  logger.info(`[chat] reconnect in ${reconnectDelay} s`);
  connectId = setTimeout(_connect, reconnectDelay * 1000 + delay);
  reconnectDelay *= 2;
}

function setupDisconnectHandler() {
  // Twurple v7: onDisconnect existe toujours
  twitch.chat.onDisconnect((manually) => {
    console.log("[chat] Disconnected, manually:", manually);
    state.set("chat.connected", false);
    state.set("chat.registered", false);
    if (!manually) reconnect();
  });
}

async function join(channel) {
  const join = await chatJoin(channel);

  if (!join.alreadyJoined) {
    logger.info(`[chat] joined ${channel}`);
    settings.set("twitch.currentChannel", channel);
  }
}

async function _connect() {
  const { channel, resolve, reject } = pendingConnection;

  console.log("[chat] _connect() called, channel:", channel);
  console.log("[chat] twitch.chat exists:", !!twitch.chat);
  console.log("[chat] isConnected:", twitch.chat.isConnected);

  try {
    // Si déjà connecté, on passe directement au join
    if (twitch.chat.isConnected) {
      console.log("[chat] Already connected, joining channel...");
      await join(channel);
      console.log("[chat] Joined channel successfully!");
      state.set("chat.connected", true);
      state.set("chat.connecting", false);
      resolve({ label: "chat", message: "connected" });
      return;
    }

    // Setup disconnect handler once
    setupDisconnectHandler();

    console.log("[chat] Calling chat.connect()...");
    // Twurple v7: connect() returns a Promise that resolves when connected & registered
    await twitch.chat.connect();
    console.log("[chat] chat.connect() success!");

    state.set("chat.registered", true);

    console.log("[chat] Joining channel...");
    await join(channel);
    console.log("[chat] Joined channel successfully!");
    state.set("chat.connected", true);
    state.set("chat.connecting", false);
    resolve({ label: "chat", message: "connected" });
  } catch (error) {
    console.error("[chat] Connection error:", error.message);
    logger.error(`[chat] ${error.stack}`);
    state.set("error", { label: "chat", message: error.message });

    // Déconnecter proprement avant de réessayer
    try {
      await twitch.chat.quit();
    } catch (e) {
      // Ignore quit errors
    }

    if (reconnectCount >= maxReconnect) {
      const message = `Too many reconnection failures (max:${maxReconnect})`;
      const err = { label: "chat", message };
      state.set("chat.connecting", false);
      state.set("chat.connected", false);
      logger.error(`[chat] ${message}`);
      state.set("error", err);
      reject(err);
      return;
    }

    reconnectCount++;
    reconnect();
  }
}

function connect(settings) {
  if (state.get("chat.connected")) {
    return Promise.resolve({ connected: true });
  }

  if (state.get("chat.connecting")) {
    return Promise.resolve({ connecting: true });
  }

  state.set("chat.connecting", true);
  state.set("error", null);

  return new Promise((resolve, reject) => {
    connectId = null;
    reconnectCount = 0;
    reconnectDelay = 2;
    pendingConnection = {
      ...settings,
      resolve,
      reject,
    };
    _connect();
  });
}

module.exports = connect;
