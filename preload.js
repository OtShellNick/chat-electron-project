const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            let validChannels = ["addSettings"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        get: (channel, data) => {
            let validChannels = ["getSettings"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        del: (channel, data) => {
            let validChannels = ["delSettings"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["Settings"];
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);