
const { app, BrowserWindow } = require('electron');
const { fork } = require("child_process");
const path = require('path');

let mainWindow;

let createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 650,
        minWidth: 900,
        minHeight: 650,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('./publish/index.html');

    mainWindow.on('closed', () => {
        mainWindow = null
    });

    // 开启子进程启动服务
    fork(__dirname + "/server/main.js", []);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
