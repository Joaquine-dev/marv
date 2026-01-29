const open = require("open");
const settings = require("../settings");

const authBaseURL = "https://id.twitch.tv/oauth2/authorize?response_type=token";

function normalizeScopes(scopes) {
  if (typeof scopes === "string") {
    scopes = [scopes];
  } else if (!scopes) {
    scopes = [];
  }
  return scopes;
}

// Create an access token object compatible with @twurple/auth v7
function createAccessToken(accessToken, scopes) {
  return {
    accessToken: accessToken,
    refreshToken: null,
    scope: scopes,
    expiresIn: null,
    obtainmentTimestamp: Date.now(),
  };
}

module.exports = class AuthProvider {
  constructor({
    clientId,
    scope = [],
    accessToken = null,
    redirectURI = "http://localhost",
    forceVerify = false,
  } = {}) {
    this.clientId = clientId;
    this.redirectURI = redirectURI;
    this.forceVerify = forceVerify;

    this.tokenType = "user";
    this.accessToken = null;
    this.currentScopes = scope;
    this._userId = null;

    if (accessToken && accessToken.trim()) {
      this.accessToken = createAccessToken(accessToken, scope);
    }

    this.__resolveToken = null;
    this.__rejectToken = null;
  }

  hasScopes(scopes) {
    return scopes.every((scope) => this.currentScopes.includes(scope));
  }

  getAuthUrl(scopes) {
    return encodeURI(
      `${authBaseURL}&client_id=${this.clientId}` +
        `&redirect_uri=${this.redirectURI}&scope=${scopes.join(" ")}` +
        `&force_verify=${this.forceVerify ? "true" : "false"}`
    );
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  resolveToken(response) {
    this.__resolveToken && this.__resolveToken(response);
    this.__resolveToken = null;
  }

  rejectToken(error) {
    this.__rejectToken && this.__rejectToken(error);
    this.__rejectToken = null;
  }

  async refresh() {
    await settings.set("twitch.accessToken", " ");
    return this.getAccessToken(this.currentScopes, { refresh: true });
  }

  // Required by @twurple/auth v7 interface
  async getAccessTokenForUser(userId, scopes) {
    if (this.accessToken) {
      return this.accessToken;
    }
    return this.getAccessToken(scopes);
  }

  // Required by @twurple/auth v7 interface
  async getAccessTokenForIntent(intent, scopes) {
    if (this.accessToken) {
      return this.accessToken;
    }
    return this.getAccessToken(scopes);
  }

  // Required by @twurple/auth v7 interface
  async getAnyAccessToken(userId) {
    if (this.accessToken) {
      return {
        accessToken: this.accessToken,
        userId: userId || this._userId,
      };
    }
    const token = await this.getAccessToken([]);
    return {
      accessToken: token,
      userId: userId || this._userId,
    };
  }

  // Required by @twurple/auth v7 interface
  get currentUser() {
    return this._userId;
  }

  setCurrentUser(userId) {
    this._userId = userId;
  }

  getAccessToken(scopes = null, { refresh = false } = {}) {
    return new Promise((resolve, reject) => {
      scopes = normalizeScopes(scopes);

      const forceVerify = refresh || this.forceVerify;

      if (!forceVerify && this.accessToken && this.hasScopes(scopes)) {
        return resolve(this.accessToken);
      }

      this.__rejectToken = reject;
      this.__resolveToken = async ({ access_token }) => {
        console.log("[AuthProvider] Token received, saving...");
        this.currentScopes = [...new Set([...this.currentScopes, ...scopes])];
        this.accessToken = createAccessToken(access_token, this.currentScopes);
        await settings.set("twitch.scope", this.currentScopes);
        await settings.set("twitch.accessToken", access_token);
        resolve(this.accessToken);
      };

      const authUrl = this.getAuthUrl(scopes);
      console.log("[AuthProvider] Opening auth URL:", authUrl);
      open(authUrl).catch((err) => {
        console.error("[AuthProvider] Failed to open browser:", err);
      });
    });
  }
};
