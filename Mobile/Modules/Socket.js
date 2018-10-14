class Socket {
    constructor(ws_options) {
        const options = {
            url: 'ws://localhost:8653',
            ...ws_options,
        };
        this.ws = new WebSocket(options.url);

        this.ws.onmessage = message => {
            console.log('Message: ', message);
        };
    }

    sendAction(action) {
        this.ws.send(JSON.stringify(action))
    }

    setServer = (ip) => {
        return new Promise((resolve, reject) => {
            this.ws.close();
            delete this.ws;
            this.ws = new WebSocket('ws://' + ip + ':8653');

            // Fail if the socket doesn't connect
            const timeout = setTimeout(() => {
                reject()
            }, 10000);

            this.ws.onmessage = message => {
                console.log('Message: ', message);
            };

            this.ws.onopen = () => {
                clearTimeout(timeout);
                resolve();
            };
        })
    }
}

module.exports = Socket;