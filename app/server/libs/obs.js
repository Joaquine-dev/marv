const OBSWebSocket = require("obs-websocket-js").default;
const { watch } = require("../../utils");
const socket = require("./socket.io");
const loggers = require("./loggers");
const { _ } = require("./i18next");

let obs = null;
const io = socket();
const logger = loggers.get("obs");

let connecting = false;
let autoReconnect = true;
let reconnectionTimeout = 5000;
let reconnectionTimeoutId = null;

let recordingHeartbeatId = null;
let recordingHeartbeatTimeout = 2000;

let sourceTypes = [];

let state = {
  connected: false,
  connecting: false,
  streaming: false,
  recording: false,
  status: null,
  scenes: null,
  sources: null,
  currentScene: null,
};

function getState() {
  return state;
}

async function call(requestType, requestData) {
  if (!obs) {
    return Promise.reject(_("sentences.obs-is-not-initialized"));
  }
  try {
    return await obs.call(requestType, requestData);
  } catch (error) {
    return Promise.reject(error.message || error);
  }
}

// Legacy send function for backward compatibility
function send(requestType, requestData) {
  return call(requestType, requestData);
}

function emit(type, ...args) {
  io.emit(`obs.${type}`, ...args);
}

function updateState(props) {
  state = { ...state, ...props };
  emit("state", state);
}

function onStreamStatus(streamStatus) {
  const streaming = streamStatus.outputActive;
  // Map to format expected by frontend
  const status = {
    ...state.status,
    "stream-timecode": streamStatus.outputTimecode,
    "stream-bytes": streamStatus.outputBytes,
    "stream-duration": streamStatus.outputDuration,
  };
  updateState({ streaming, status });
}

function onRecordStatus(recordStatus) {
  const recording = recordStatus.outputActive;
  // Map to format expected by frontend
  const status = {
    ...state.status,
    "rec-timecode": recordStatus.outputTimecode,
    "rec-bytes": recordStatus.outputBytes,
    "rec-duration": recordStatus.outputDuration,
  };
  updateState({ recording, status });
}

async function updateStreamStatus() {
  try {
    const streamStatus = await call("GetStreamStatus");
    onStreamStatus(streamStatus);
    const recordStatus = await call("GetRecordStatus");
    onRecordStatus(recordStatus);
    // Get system stats (FPS, CPU, MEM)
    const stats = await call("GetStats");
    updateState({
      status: {
        ...state.status,
        fps: stats.activeFps,
        "cpu-usage": stats.cpuUsage,
        "memory-usage": stats.memoryUsage,
        "free-disk-space": stats.availableDiskSpace,
        "render-skipped-frames": stats.renderSkippedFrames,
        "output-skipped-frames": stats.outputSkippedFrames,
      },
    });
  } catch (error) {
    logger.error(`Failed to get stream/record status: ${error}`);
  }
}

async function updateSceneList() {
  try {
    const { currentProgramSceneName, scenes } = await call("GetSceneList");
    updateState({
      currentScene: currentProgramSceneName,
      scenes: scenes.map((s) => ({ name: s.sceneName, ...s })),
    });
  } catch (error) {
    logger.error(`Failed to get scene list: ${error}`);
  }
}

async function updateSourcesList() {
  try {
    const { inputs } = await call("GetInputList");
    const sources = inputs.map((input) => ({
      name: input.inputName,
      type: input.inputKind,
      typeId: input.inputKind,
    }));
    updateState({ sources });
  } catch (error) {
    logger.error(`Failed to get sources list: ${error}`);
  }
}

function recordingHeartbeat() {
  recordingHeartbeatId = setTimeout(() => {
    updateStreamStatus();
    recordingHeartbeat();
  }, recordingHeartbeatTimeout);
}

function clearRecordingHeartbeat() {
  clearTimeout(recordingHeartbeatId);
  recordingHeartbeatId = null;
}

function registerEvents(obs) {
  obs.on("RecordStateChanged", (data) => {
    const recording = data.outputActive;
    updateState({ recording });
    if (recording && !state.streaming) {
      recordingHeartbeat();
    } else if (!recording) {
      clearRecordingHeartbeat();
    }
  });

  obs.on("StreamStateChanged", (data) => {
    const streaming = data.outputActive;
    updateState({ streaming });
    if (streaming) {
      clearRecordingHeartbeat();
    } else if (state.recording) {
      recordingHeartbeat();
    }
  });

  obs.on("CurrentProgramSceneChanged", (data) => {
    updateState({ currentScene: data.sceneName });
  });

  obs.on("SceneListChanged", updateSceneList);

  obs.on("InputVolumeChanged", (data) => {
    emit(`source.volume`, {
      sourceName: data.inputName,
      volume: data.inputVolumeDb,
      volumeMul: data.inputVolumeMul,
    });
  });

  obs.on("InputMuteStateChanged", (data) => {
    emit(`source.muted`, {
      sourceName: data.inputName,
      muted: data.inputMuted,
    });
  });
}

function reconnect(settings) {
  obs = null;

  logger.info(`Reconnecting in ${reconnectionTimeout / 1000} sec.`);
  updateState({ connected: false, connecting: true });

  reconnectionTimeoutId = setTimeout(() => {
    connecting = false;
    connect(settings);
  }, reconnectionTimeout);
}

async function connect({
  host = "localhost",
  port = 4455,
  password = null,
} = {}) {
  if (obs || connecting) return;

  connecting = true;
  autoReconnect = true;
  const address = `ws://${host}:${port}`;

  updateState({ connected: false, connecting: true });
  logger.info(`Connecting to ${address}`);
  emit("connect");

  function onConnectionClosed() {
    logger.info("Connection closed");
    updateState({ connected: false, connecting: false });
    clearRecordingHeartbeat();
    emit("disconnected");
    obs = null;
    if (autoReconnect) {
      reconnect({ host, port, password });
    } else {
      connecting = false;
    }
  }

  obs = new OBSWebSocket();

  try {
    await obs.connect(address, password || undefined);
    logger.info("Connected");
    connecting = false;
    updateState({ connected: true, connecting });
    obs.on("ConnectionClosed", onConnectionClosed);
    obs.on("ExitStarted", onConnectionClosed);
    registerEvents(obs);
    await updateStreamStatus();
    await updateSourcesList();
    await updateSceneList();
    // Start stats heartbeat
    recordingHeartbeat();
    emit("connected");
  } catch (error) {
    logger.error(`Connection error: ${error.message || error.code}`);
    updateState({ connected: false, connecting: autoReconnect });
    if (autoReconnect) {
      reconnect({ host, port, password });
    } else {
      connecting = false;
    }
  }
}

function disconnect() {
  connecting = false;
  updateState({ connected: false, connecting });
  clearTimeout(reconnectionTimeoutId);
  reconnectionTimeoutId = null;
  obs && obs.disconnect();
  autoReconnect = false;
  obs = null;
}

module.exports = {
  connect,
  disconnect,
  getState,
  send,
  call,
};
