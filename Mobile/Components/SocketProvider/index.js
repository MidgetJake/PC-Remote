import React, { Component } from 'react';
import { SocketContext } from './context';

type Props = {};
export default class SocketProvider extends Component<Props> {
    render() {
        const { children, socket } = this.props;

        return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    }
}