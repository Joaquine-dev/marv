const twitch = require("../index");

module.exports = async function getUser(channel) {
  // Twurple v7: use api.users (not api.helix.users)
  return await twitch.api.users.getUserByName(channel);
};
