const api = require("../api/getUserInfoVars");
const pushActions = require("../pushActions");

// EventSub channel.cheer event handler
module.exports = async function onBits(event) {
  const userVars = await api.getPubSubUserInfoVars({
    login: event.isAnonymous ? null : event.userDisplayName?.toLowerCase(),
    id: event.isAnonymous ? null : event.userId,
  });

  pushActions("onBits", {
    user: event.isAnonymous ? "Anonymous" : event.userDisplayName,
    message: event.message || "",
    amount: event.bits,
    total: event.bits, // EventSub doesn't provide cumulative total
    ...userVars,
  });
};
