const twitch = require("../index");
const login = require("../login");

module.exports = async function updateReward({ id, isPaused }) {
  const user = await login();
  // Twurple v7: use api.channelPoints (not api.helix.channelPoints)
  const reward = await twitch.api.channelPoints.updateCustomReward(
    user.id,
    id,
    { isPaused }
  );
  if (!reward) return null;
  // Map to expected format
  return {
    id: reward.id,
    title: reward.title,
    cost: reward.cost,
    is_enabled: reward.isEnabled,
    is_paused: reward.isPaused,
  };
};
