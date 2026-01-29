const login = require("../login");
const twitch = require("../index");
const Viewer = require("../../../db/Models/Viewer");

module.exports = async function getLastFollows() {
  const user = await login();
  // Twurple v7: use api.channels.getChannelFollowersPaginated
  const followsPaginated = twitch.api.channels.getChannelFollowersPaginated(user.id);

  const newFollows = [];

  let follows = await followsPaginated.getNext();

  for (let i = 0, l = follows.length; i < l; i++) {
    const follow = follows[i];

    const oldFollow = await Viewer.findByPk(follow.userId);

    if (oldFollow) break;

    const newFollow = await Viewer.create({
      id: follow.userId,
      name: follow.userDisplayName,
      followedAt: follow.followDate,
      isFollowing: true,
    });

    newFollows.push(newFollow);
  }

  return newFollows;
};
