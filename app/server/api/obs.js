const settings = require("../libs/settings");
const obs = require("../libs/obs");

function getSettings() {
  return settings.getAll("obs.");
}

module.exports = {
  connect: async () => obs.connect(await getSettings()),
  disconnect: () => obs.disconnect(),
  getState: () => obs.getState(),
  emit: (requestType, requestData) => obs.call(requestType, requestData),
  getSettings,
  setSetting: (key, value) => {
    return settings.set(`obs.${key}`, value);
  },
};
