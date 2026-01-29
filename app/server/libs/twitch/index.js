const config = require("./config");
const settings = require("../settings");
const { ApiClient } = require("@twurple/api");
const { StaticAuthProvider } = require("@twurple/auth");
const AuthProvider = require("./AuthProvider");
const { ChatClient } = require("@twurple/chat");

require("./logger-hook");

const api = {
  config,
  authProvider: null,
  staticAuthProvider: null,
  chat: null,
  api: null,
};

api.init = async function init() {
  const host = await settings.get("server.host");
  const port = await settings.get("server.port");
  const scope = await settings.get("twitch.scope", []);
  const accessToken = await settings.get("twitch.accessToken", null);
  const redirectURI = `http://${host}:${port}/${config.redirectPath}`;

  // Custom auth provider for OAuth flow
  api.authProvider = new AuthProvider({
    ...config,
    redirectURI,
    accessToken,
    scope,
  });

  // Static auth provider for API and Chat (twurple v7)
  if (accessToken && accessToken.trim()) {
    api.staticAuthProvider = new StaticAuthProvider(config.clientId, accessToken, scope);
    api.api = new ApiClient({ authProvider: api.staticAuthProvider });
    api.chat = new ChatClient({
      authProvider: api.staticAuthProvider,
      channels: [],
    });
  } else {
    api.api = new ApiClient({ authProvider: api.authProvider });
    api.chat = new ChatClient({
      authProvider: api.authProvider,
      channels: [],
    });
  }
};

api.updateAuthProvider = async function updateAuthProvider() {
  const scope = await settings.get("twitch.scope", []);
  const accessToken = await settings.get("twitch.accessToken", null);

  if (accessToken && accessToken.trim()) {
    api.staticAuthProvider = new StaticAuthProvider(config.clientId, accessToken, scope);
    api.api = new ApiClient({ authProvider: api.staticAuthProvider });
    api.chat = new ChatClient({
      authProvider: api.staticAuthProvider,
      channels: [],
    });
  }
};

module.exports = api;
