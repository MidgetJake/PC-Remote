import React, {Component} from 'react';
import { View, StyleSheet, ScrollView, AsyncStorage, Dimensions } from 'react-native';
import { Portal, Dialog, Button, Divider, TextInput } from 'react-native-paper';
import { SocketContext } from '../SocketProvider/context';

type Props = {};
export default class ConnectToDevice extends Component<Props> {
    constructor(props) {
        super(props);

        this.state= {
            name: 'New Device',
            ip: '',
        };
    };

    updateIP = ip => {
        this.setState({ ip });
    };

    updateName = name => {
        this.setState({ name });
    };

    handleNewDevice = () => {
        this.props.onSubmit(this.state.ip, this.state.name);
    };

    render() {
        return (
            <Portal>
                <Dialog visible={true} style={{ elevation: 4, }} onClose={this.props.onClose} >
                    <TextInput label={'Device Name'} value={this.state.name} onChangeText={this.updateName}/>
                    <TextInput label={'Device IP'} value={this.state.ip} onChangeText={this.updateIP}/>
                    <Dialog.Actions>
                        <Button onPress={this.props.onClose}>Cancel</Button>
                        <Button onPress={this.handleNewDevice}>Add Device</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        );
    }
}

const styles = StyleSheet.create({
    scroll: {
        maxHeight: Dimensions.get('window').height - 250,
    }
});
