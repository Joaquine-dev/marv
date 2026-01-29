const state = require("./state");
const getConnectedUser = require("./api/getConnectedUser");

let user = null;

module.exports = async function login() {
  console.log("[twitch.login] login() called, existing user:", user);
  if (user && user.display_name) return user;

  console.log("[twitch.login] Calling getConnectedUser()...");
  user = await getConnectedUser();
  console.log("[twitch.login] getConnectedUser() returned:", user);
  state.set("user", user);

  return user;
};
