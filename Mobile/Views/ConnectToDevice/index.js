import React, {Component} from 'react';
import { View, StyleSheet, ScrollView, AsyncStorage, Dimensions } from 'react-native';
import { Portal, Dialog, Button, Divider, TextInput } from 'react-native-paper';
import { SocketContext } from '../../Components/SocketProvider/context';

type Props = {};
export default class ConnectToDevice extends Component<Props> {
    constructor(props) {
        super(props);

        this.state= {
            ip: '',
        };
    };

    updateIP = ip => {
        this.setState({ ip });
    };

    handleConnect = socket => {
        console.log(socket);
        socket.setServer(this.state.ip).then(() => {
            this.props.connected();
        });
    };

    render() {
        return (

            <SocketContext.Consumer>
                {socket => (
                    <Portal>
                        <Dialog visible={true} style={{ elevation: 4, }} >
                            <TextInput label={'Device IP'} value={this.state.ip} onChangeText={() => this.updateIP(socket)}/>
                            <Dialog.Actions>
                                <Button onPress={this.handleConnect}>Connect</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                )}
            </SocketContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    scroll: {
        maxHeight: Dimensions.get('window').height - 250,
    }
});
