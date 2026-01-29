const twitch = require("../index");

module.exports = async function getStreamByChannel(channel) {
  channel = channel[0] === "#" ? channel.slice(1) : channel;
  // Twurple v7: use api.users and api.streams (not api.helix.*)
  const user = await twitch.api.users.getUserByName(channel);
  if (!user) return null;
  const stream = await twitch.api.streams.getStreamByUserId(user.id);
  if (!stream) return null;
  // Map to expected format
  return {
    id: stream.id,
    user_id: stream.userId,
    user_login: stream.userName,
    user_name: stream.userDisplayName,
    game_id: stream.gameId,
    game_name: stream.gameName,
    type: stream.type,
    title: stream.title,
    viewer_count: stream.viewers,
    started_at: stream.startDate ? stream.startDate.toISOString() : null,
    language: stream.language,
    thumbnail_url: stream.thumbnailUrl,
    is_mature: stream.isMature,
  };
};
