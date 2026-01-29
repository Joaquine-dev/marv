const loggers = require("../../../libs/loggers");
const twitch = require("../index");
const state = require("../state");

// Validate token and get user_id from Twitch
async function validateToken(accessToken) {
  const response = await fetch("https://id.twitch.tv/oauth2/validate", {
    headers: {
      Authorization: `OAuth ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Token validation failed: ${response.status}`);
  }
  return response.json();
}

let connectId = null;
let maxReconnect = 2;
let reconnectCount = 0;
let reconnectDelay = 2; // seconds

const logger = loggers.get("twitch");

// Required scopes for Twitch authentication
const REQUIRED_SCOPES = [
  "chat:read",
  "chat:edit",
  "channel:read:subscriptions",
  "channel:read:redemptions",
  "bits:read",
  "channel:moderate",
  "whispers:read",
  "whispers:edit",
  "user:read:email",
];

let connectedUser = null;
let pendingConnection = {
  resolve: null,
  reject: null,
  channel: null,
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function reconnect() {
  const delay = getRandomInt(1000);
  connectId && clearTimeout(connectId);
  logger.info(`[user] reconnect in ${reconnectDelay} s`);
  connectId = setTimeout(_connect, reconnectDelay * 1000 + delay);
  reconnectDelay *= 2;
}

async function _connect() {
  const { resolve, reject } = pendingConnection;
  console.log("[getConnectedUser] _connect() called");

  try {
    // Step 1: First ensure we have a valid token by triggering OAuth if needed
    console.log("[getConnectedUser] Step 1: Getting access token (this may open browser)...");
    const token = await twitch.authProvider.getAccessToken(REQUIRED_SCOPES);
    console.log("[getConnectedUser] Token obtained:", token ? "yes" : "no");

    if (!token || !token.accessToken) {
      throw new Error("Failed to obtain access token");
    }

    // Update static auth provider with new token
    console.log("[getConnectedUser] Updating auth providers...");
    await twitch.updateAuthProvider();

    // Step 2: Validate token to get user_id (required for Twurple v7)
    console.log("[getConnectedUser] Step 2: Validating token to get user_id...");
    const validation = await validateToken(token.accessToken);
    console.log("[getConnectedUser] Token validated, user_id:", validation.user_id);

    if (!validation.user_id) {
      throw new Error("Token validation did not return user_id");
    }

    // Step 3: Now call the API to get the authenticated user with userId
    console.log("[getConnectedUser] Step 3: Calling twitch.api.users.getAuthenticatedUser()...");
    const user = await twitch.api.users.getAuthenticatedUser(validation.user_id);
    console.log("[getConnectedUser] Got user:", user ? user.displayName : "null");

    if (!user) {
      throw new Error("User not found");
    }

    state.set("userState.connected", true);
    state.set("userState.connecting", false);

    // Twurple v7: access user data directly
    const userData = {
      id: user.id,
      login: user.name,
      display_name: user.displayName,
      profile_image_url: user.profilePictureUrl,
      broadcaster_type: user.broadcasterType,
      description: user.description,
      created_at: user.creationDate,
    };

    // Store user ID in auth provider for future requests
    twitch.authProvider.setCurrentUser(user.id);

    connectedUser = userData;
    resolve(userData);
  } catch (error) {
    console.error("[getConnectedUser] Error:", error.message);
    logger.error(`[user] ${error.stack}`);
    state.set("error", { label: "user", message: error.message });

    if (reconnectCount >= maxReconnect) {
      const message = `Too many reconnection failures (max:${maxReconnect})`;
      const err = { label: "user", message };
      state.set("userState.connecting", false);
      state.set("userState.connected", false);
      logger.error(`[user] ${message}`);
      state.set("error", err);
      reject(err);
      return;
    }

    reconnectCount++;
    reconnect();
  }
}

module.exports = async function getConnectedUser() {
  console.log("[getConnectedUser] getConnectedUser() called");
  if (state.get("userState.connected")) {
    return Promise.resolve(connectedUser);
  }

  if (state.get("userState.connecting")) {
    return Promise.reject(new Error("Already connecting"));
  }

  state.set("userState.connecting", true);
  state.set("error", null);

  return new Promise((resolve, reject) => {
    pendingConnection = { resolve, reject };
    reconnectDelay = 2;
    reconnectCount = 0;
    connectId = null;
    _connect();
  });
};
