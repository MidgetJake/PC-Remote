import React, {Component} from 'react';
import { View, StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import { Button, Portal, Dialog, Checkbox, Text, Divider, RadioButton } from 'react-native-paper';
import ActionEditor from './ActionEditor';

type Props = {};
export default class MacroOptionRow extends Component<Props> {
    constructor(props) {
        super(props);

        this.state= {
            index: this.props.index,
            type_open: false,
            action: 'keypress',
            value: 'a',
        };
    };

    removeRow = () => {
        this.props.remove(this.state.index);
    };

    handleClose = () => {
        this.setState({ type_open: false });
    };

    editType = () => {
        this.setState({ type_open: true });
    };

    setType = action => event => {
        this.setState({ action, value: action === 'mouseclick' ? { button: 0, double: false } : 'a', type_open: false});
        this.props.update(action, this.state.index);
    };

    updateAction = action => {
        this.setState({ action: action.action, value: action.value });
        this.props.update(action, this.state.index);
    };

    render() {
        return (
            <View style={styles.root}>
                <View style={styles.row}>
                    <Button onPress={this.editType} icon={'create'}>Set Type</Button>
                    <Button onPress={this.removeRow} icon={'delete'}>Delete</Button>
                </View>
                <ActionEditor action={this.state.action} value={this.state.value} update={this.updateAction}/>
                <Divider/>

                <Portal>
                    <Dialog visible={this.state.type_open} onDismiss={this.handleClose} style={{ elevation: 4, }}>
                        <Dialog.Title>
                            Select Action Type
                        </Dialog.Title>
                        <Dialog.Content>
                            <Button style={{ marginBottom: 10 }} mode={'outlined'} onPress={this.setType('mouseclick')}>Mouse Button</Button>
                            <Button style={{ marginBottom: 10 }} mode={'outlined'} onPress={this.setType('buttonpress')}>Button Press</Button>
                            <Button style={{ marginBottom: 10 }} mode={'outlined'} onPress={this.setType('sendstring')}>Type String</Button>
                            <Button mode={'outlined'} onPress={this.setType('keypress')}>Single Character</Button>
                        </Dialog.Content>
                    </Dialog>
                </Portal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    root: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
    },
    singleCheck: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioList: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 7,
    },
    radioSet: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 10,
        flex: 1,
    },
});
