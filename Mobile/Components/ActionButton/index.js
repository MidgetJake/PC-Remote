import React, {Component} from 'react';
import { Button, withTheme } from 'react-native-paper';
import { SocketContext } from '../SocketProvider/context';

type Props = {};
class ActionButton extends Component<Props> {
    constructor(props) {
        super(props);

        this.state = {
            config: this.props.config || null,
            action_type: this.props.action_type || 'single',
            /**
             *  The action that will be performed on the device
             *  Valid values:
             *      - keypress
             *      - mouseclick
             *      - sendstring
             */
            action: this.props.action || 'keypress',
            value: this.props.value || 'x',
        };
        console.log(this.state);
    };

    sendAction = socket => {
        const action = {};
        if(this.state.config !== null) {
            action.config = this.state.config;
            action.action_type = 'config';
            action.action = 'config';
        } else {
            action.action = this.state.action;
            action.value = this.state.value;
            action.action_type = this.state.action_type;
        }

        socket.sendAction(action);
    };

    render() {
        const { children } = this.props;

        return (
            <SocketContext.Consumer>
                {socket => (
                    <Button mode='contained' onPress={() => this.sendAction(socket)} style={{marginBottom: 10}}>{children}</Button>
                )}
            </SocketContext.Consumer>
        );
    }
}

export default withTheme(ActionButton)