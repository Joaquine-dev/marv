const api = require("../api/getUserInfoVars");
const pushActions = require("../pushActions");

// EventSub channel.channel_points_custom_reward_redemption.add event handler
module.exports = async function onRedemption(event) {
  const userVars = await api.getPubSubUserInfoVars({
    login: event.userDisplayName.toLowerCase(),
    id: event.userId,
  });

  pushActions("onRedemption", {
    id: event.id,
    user: event.userDisplayName,
    reward: {
      id: event.rewardId,
      title: event.rewardTitle,
      cost: event.rewardCost,
      prompt: event.rewardPrompt,
    },
    message: event.input || "",
    ...userVars,
  });
};
