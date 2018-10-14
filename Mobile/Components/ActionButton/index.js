import React, {Component} from 'react';
import { Button, withTheme, Text, Card, TouchableRipple } from 'react-native-paper';
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

    openOptions = () => {
        console.log('OPTIONS');
    };

    render() {
        const { children, theme } = this.props;

        return (
            <SocketContext.Consumer>
                {socket => (
                    <Card
                        style={{backgroundColor: theme.colors.primary, marginBottom: 15, overflow: 'hidden'}}
                    >
                        <TouchableRipple
                            onPress={() => this.sendAction(socket)}
                            style={{padding: 10}}
                            onLongPress={() => this.openOptions()}
                        >
                            <Text style={{color: '#eee'}}>{children}</Text>
                    {/*<Button mode='contained' onPress={() => this.sendAction(socket)} style={{marginBottom: 10}}>{children}</Button>*/}

                        </TouchableRipple>
                    </Card>
                )}
            </SocketContext.Consumer>
        );
    }
}

export default withTheme(ActionButton)