const appApi = require("../../../api/app");
const { _ } = require("../../i18next");
const twitch = require("../index");
const login = require("../login");
const retry = require("../retry");

// Map HelixCustomReward to the format expected by the client
function mapReward(reward) {
  return {
    id: reward.id,
    broadcaster_id: reward.broadcasterId,
    broadcaster_login: reward.broadcasterName,
    broadcaster_name: reward.broadcasterDisplayName,
    title: reward.title,
    prompt: reward.prompt,
    cost: reward.cost,
    image: reward.getImageUrl ? {
      url_1x: reward.getImageUrl(1),
      url_2x: reward.getImageUrl(2),
      url_4x: reward.getImageUrl(4),
    } : null,
    background_color: reward.backgroundColor,
    is_enabled: reward.isEnabled,
    is_user_input_required: reward.userInputRequired,
    is_paused: reward.isPaused,
    is_in_stock: reward.isInStock,
    max_per_stream_setting: {
      is_enabled: reward.maxRedemptionsPerStream !== null,
      max_per_stream: reward.maxRedemptionsPerStream || 0,
    },
    max_per_user_per_stream_setting: {
      is_enabled: reward.maxRedemptionsPerUserPerStream !== null,
      max_per_user_per_stream: reward.maxRedemptionsPerUserPerStream || 0,
    },
    global_cooldown_setting: {
      is_enabled: reward.globalCooldown !== null,
      global_cooldown_seconds: reward.globalCooldown || 0,
    },
    should_redemptions_skip_request_queue: reward.autoFulfill,
    redemptions_redeemed_current_stream: reward.redemptionsThisStream,
    cooldown_expires_at: reward.cooldownExpiryDate ? reward.cooldownExpiryDate.toISOString() : null,
  };
}

function mapSort(rewards) {
  return rewards.map(mapReward).sort((a, b) => a.cost - b.cost);
}

async function _getRewardList() {
  const user = await login();
  // Twurple v7: use api.channelPoints (not api.helix.channelPoints)
  const rewards = await twitch.api.channelPoints.getCustomRewards(user.id);
  return rewards ? mapSort(rewards) : null;
}

module.exports = async function getRewardList() {
  try {
    return await retry(_getRewardList);
  } catch (error) {
    appApi.stateNotify("error", _("errors.unable_to_fetch_rewards_list"));
    return [];
  }
};
