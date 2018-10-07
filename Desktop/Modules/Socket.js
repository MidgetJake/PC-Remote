const WebSocket = require('ws');
const robot = require('robotjs');
// const { Notification } = require('electron');
// const Toaster = require('node-notifier').WindowsToaster;
const path = require('path');
const mouseButtons = ['left', 'right', 'middle'];

class Socket {
    constructor(notify) {
        this.notify = notify;

        this.ws = new WebSocket.Server({
            port: 8653,
        });

        this.ws.on('connection', (ws, req) => {
            this.notify.notify({
                // title: 'New Connection!',
                text: 'A remote has connected to your Device',
                sound: path.join(__dirname, '../Assets/Audio/connection.wav'),
            });

            ws.isAlive = true;
            ws.on('pong', this.heartbeat);

            ws.on('message', event => {
                const msg = JSON.parse(event);
                Socket.parseAction(msg)
            })
        });

        setInterval(() => {
            this.ws.clients.forEach(clientWS => {
                if(clientWS.isAlive === false) return clientWS.terminate();
                clientWS.isAlive = false;
                clientWS.ping(() => {});
            });
        }, 30000);
    }

    static parseAction(action) {
        switch(action.action) {
            case 'keypress':
            case 'buttonpress':
                Socket.sendKeyStroke(action.value);
                break;
            case 'mouseclick':
                Socket.sendMouseClick(action.value.button, action.value.double);
                break;
            case 'sendstring':
                Socket.sendString(action.value);
                break;
            case 'config':
                Socket.parseConfig(action.config);
                break
        }
    }

    // Setup web sockets
    heartbeat() {
        this.isAlive = true;
    }

    static parseConfig(config) {
        console.log(config);
        if(config.length < 1) return;
        const action = config[0];
        config.shift();
        if(action === null) {
            Socket.parseConfig(config);
        }

        if(typeof action === 'object'){
            Socket.parseAction(action);
            Socket.parseConfig(config);
        } else {
            setTimeout(() => {
                Socket.parseConfig(config);
            }, action);
        }
    }

    static sendKeyStroke(stroke) {
        robot.keyTap(stroke);
    }

    static sendMouseClick(button, double = false){
        robot.mouseClick(mouseButtons[button], double);
    }

    static sendString(string) {
        robot.typeString(string);
    }
}

module.exports = Socket;