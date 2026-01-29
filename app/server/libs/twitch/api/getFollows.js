const login = require("../login");
const twitch = require("../index");
const Viewer = require("../../../db/Models/Viewer");

module.exports = async function getFollows({ delay = 2 } = {}) {
  const user = await login();
  // Twurple v7: use api.channels.getChannelFollowersPaginated
  const followsPaginated = twitch.api.channels.getChannelFollowersPaginated(user.id);

  const oldFollows = [];
  const newFollows = [];

  return new Promise((resolve) => {
    const getNext = async () => {
      let follows = await followsPaginated.getNext();

      if (!follows.length) {
        return resolve({ oldFollows, newFollows });
      }

      for (let i = 0, l = follows.length; i < l; i++) {
        const follow = follows[i];

        const oldFollow = await Viewer.findByPk(follow.userId);

        if (oldFollow) {
          oldFollows.push(oldFollow);
        } else {
          const newFollow = await Viewer.create({
            id: follow.userId,
            name: follow.userDisplayName,
            followedAt: follow.followDate,
            isFollowing: true,
          });

          newFollows.push(newFollow);
        }
      }

      setTimeout(getNext, delay * 1000);
    };

    getNext();
  });
};
