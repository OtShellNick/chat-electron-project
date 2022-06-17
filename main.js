const { app, BrowserWindow, ipcMain } = require('electron');
const Store = require('electron-store');
const isDev = require('electron-is-dev');
const path = require('path');

const store = new Store();

function createWindow () {
    const win = new BrowserWindow({
        width: 500,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, 'preload.js')
        },
    });

    win.loadURL(
        isDev
            ? 'http://localhost:8088'
            : `file://${path.join(__dirname, './build/index.html')}`
    );
    // Open the DevTools.
    if (isDev) {
        win.webContents.openDevTools({ mode: 'detach' });
    }

    ipcMain.on("addSettings", (event, args) => {
        store.set(args);
    });

    ipcMain.on('getSettings', (event, args) => {
        const setting = store.get(args);
        win.webContents.send('Settings', {key: args, data: setting})
    });

    ipcMain.on('delSettings', (event, args) => {
        store.delete(args);
    })
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
