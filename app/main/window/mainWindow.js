const openLinkInBrowser = require("./openLinkInBrowser");
const { getServerURL } = require("../../server/utils");
const { staticPath, watch } = require("../../utils");
const webPreferences = require("./webPreferences");
const { BrowserWindow } = require("electron");
const storeBounds = require("./storeBounds");
const hideOnClose = require("./hideOnClose");
const path = require("path");

let win = null;

module.exports = async function createWindow({ showOnLoad = true } = {}) {
  if (win) return win;

  win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    frame: false,
    icon: path.join(staticPath, "icon.png"),
    webPreferences: { ...webPreferences, devTools: true },
  });

  hideOnClose(win);
  openLinkInBrowser(win);
  storeBounds({ win, name: "main" });

  win.webContents.once("did-finish-load", () => {
    showOnLoad && win.show();
  });

  win.removeMenu();

  const url = `${await getServerURL()}?electron`;
  console.log("[mainWindow] Loading URL:", url);

  win.loadURL(url).catch((err) => {
    console.error("[mainWindow] Failed to load URL:", err);
    win.show(); // Show window anyway to see the error
  });

  // Only open DevTools in development
  if (process.argv.includes("-w") || process.argv.includes("--watch")) {
    win.webContents.openDevTools();
  }

  return win;
};
