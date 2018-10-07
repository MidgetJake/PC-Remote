class Socket {
    constructor() {
        this.ws = new WebSocket('ws://192.168.0.25:8653');

        this.ws.onmessage = message => {
            console.log('Message: ', message);
        };
    }

    sendAction(action) {
        console.log(action);
        this.ws.send(JSON.stringify(action))
    }

    setServer(ip){
        delete this.ws;
        this.ws = new WebSocket('ws://' + ip + ':8653');
    }
}

module.exports = Socket;