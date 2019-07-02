const { app, BrowserWindow } = require('electron');
const { fork } = require("child_process");
const path = require('path');

// const Menu = electron.Menu

let mainWindow;

let createWindow = () => {
    // 隐藏菜单栏

    mainWindow = new BrowserWindow({
        width: 600,
        height: 650,
        minWidth: 576,
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
