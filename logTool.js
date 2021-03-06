"use strict";

const fs = require("fs");
const path = require("path");
const { app } = require("electron");

function getCurrentDateTime() {
    const t = new Date();

    const y = t.getFullYear().toString();
    const m = (t.getMonth() + 1).toString().padStart(2, "0");
    const d = t.getDate().toString().padStart(2, "0");
    const H = t.getHours().toString().padStart(2, "0");
    const M = t.getMinutes().toString().padStart(2, "0");
    const S = t.getSeconds().toString().padStart(2, "0");
    const MS = t.getMilliseconds().toString().padStart(3, "0");

    return `${y}${m}${d}_${H}${M}${S}_${MS}`;
}

function initSystemLogger() {
    const logsDir = path.resolve(path.join(app.getPath("documents")));
    // if (!fs.existsSync(logsDir)) {
    //     fs.mkdirSync(logsDir);
    // }

    const currentDateTime = getCurrentDateTime();
    const outFilePath = path.join(logsDir, `${currentDateTime}-out.log`);
    const errorFilePath = path.join(logsDir, `${currentDateTime}-error.log`);

    const nodeConsoleLog = console.log.bind(console);

    const outStream = fs.createWriteStream(outFilePath);
    const errorStream = fs.createWriteStream(errorFilePath);
    const fileConsole = new console.Console(outStream, errorStream);

    console.log = function (message, ...optionalParams) {
        nodeConsoleLog(message, ...optionalParams);
        fileConsole.log(message, ...optionalParams);
    }
}

function appExceptionHandler() {
    process.on("uncaughtException", (error) => {
        console.log("[uncaughtException] ", error);
    });
    process.on("rejectionHandled", promise => {
        console.log("[rejectionHandled] happended");
    });
    process.on("unhandledRejection", (reason, promise) => {
        console.log("[unhandledRejection] reason:", reason);
    });
}

function main() {

    initSystemLogger();
    console.log(
        `platform(${process.platform}), ` +
        `execPath(${process.execPath}), ` +
        `cwd(${process.cwd()}), ` +
        `argv(${JSON.stringify(process.argv)})`
    );
    appExceptionHandler();
}

main();