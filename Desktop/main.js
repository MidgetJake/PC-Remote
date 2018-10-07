const { app, Tray, Menu } = require('electron');
const Socket = require('./Modules/Socket');
const path = require('path');

let tray = null;

app.on('ready', () => {
    const eNotify = require('electron-notify');
    eNotify.setConfig({
        appIcon: path.join(__dirname, 'Assets/Img/icon.png'),
        displayTime: 5000,
        width: 400,
        height: 70,
        padding: 10,
        defaultStyleContainer: {
            padding: 0,
            display: 'flex',
            width: 400,
            height: 70,
            background: '#F0F0F0',
            fontFamily: 'SegoeUI, Arial',
            borderRadius: 5,
            overflow: 'hidden',
        },
        defaultStyleAppIcon: {
            height: '100%',
            width: 'auto',
            marginRight: 10,
        },
        defaultStyleText: {
            paddingTop: 5,
            height: 70,
        },
        defaultStyleClose: {
            display: 'none',
        }
    });

    const ws = new Socket(eNotify);

    tray = new Tray(path.join(__dirname, 'Assets/Img/icon.png'));
    const contextMenu = Menu.buildFromTemplate([
        {label: 'Close Receiver', type: 'normal', click: () => app.quit()},
    ]);
    tray.setToolTip('PC Remote');
    tray.setContextMenu(contextMenu)
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});