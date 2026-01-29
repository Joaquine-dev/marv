#!/usr/bin/env node

"use strict";

const tailwind = require.resolve("tailwindcss/lib/cli.js");
const { fork } = require("child_process");
const chalk = require("chalk");
const path = require("path");

const colors = new chalk.Instance({ level: 3 });
const config = path.resolve(__dirname, "config.js");
const input = path.resolve(__dirname, "index.css");
const output = path.resolve(__dirname, "../app/static/css/tailwind.css");
const isProd = process.argv.includes("--prod");

// Tailwind CSS v3 CLI arguments
const args = ["-i", input, "-o", output, "-c", config];
if (!isProd) {
  args.push("--watch");
}
if (isProd) {
  args.push("--minify");
}

function build() {
  fork(tailwind, args, { stdio: ["inherit", "inherit", "inherit", "ipc"] });
}

build();
