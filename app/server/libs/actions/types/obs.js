const createAction = require("../create");
const obs = require("../../obs");

function create(action) {
  return createAction(action);
}

const actions = {
  async ToggleAudio(action) {
    const { source } = action.widget.component.props;
    return obs.call("ToggleInputMute", { inputName: source });
  },
  async AudioVolume(action) {
    const { source } = action.widget.component.props;
    const { volume, mute } = action.data || action.eventProps || {};
    if (mute !== undefined) {
      return obs.call("SetInputMute", { inputName: source, inputMuted: mute });
    }
    // OBS v5 uses inputVolumeMul (0.0 to 1.0) instead of volume percentage
    return obs.call("SetInputVolume", {
      inputName: source,
      inputVolumeMul: volume,
    });
  },
  async ToggleScene(action) {
    const { currentScene } = obs.getState();
    const { scene1, scene2 } = action.widget.component.props;
    const scene = currentScene === scene1 ? scene2 : scene1;
    return obs.call("SetCurrentProgramScene", { sceneName: scene });
  },
  async GoToScene(action) {
    const { scene } = action.widget.component.props;
    return obs.call("SetCurrentProgramScene", { sceneName: scene });
  },
  async SceneList(action) {
    const { scene } = action.data || action.eventProps || {};
    return obs.call("SetCurrentProgramScene", { sceneName: scene });
  },
  async Send(action) {
    return obs.call(action.data.eventName, action.data.args);
  },
};

function send(action) {
  const func = actions[action.widget.component.name] || actions.Send;
  return func(action);
}

module.exports = { create, send };
