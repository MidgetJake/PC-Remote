import React, {Component} from 'react';
import { View, StyleSheet, ScrollView, AsyncStorage, Dimensions } from 'react-native';
import { Portal, Dialog, Button, Divider, TextInput } from 'react-native-paper';
import MacroOptionRow from '../../Components/MacroOptionRow';

type Props = {};
export default class CreateMacro extends Component<Props> {
    constructor(props) {
        super(props);

        this.state= {
            options: [],
            config: [],
            name: '',
        };
    };

    updateName = name => {
        this.setState({ name });
    };

    addOption = () => {
        const options = this.state.options;
        const config = this.state.config;

        options.push(
            <MacroOptionRow
                theme={this.props.theme}
                key={options.length}
                index={options.length}
                update={this.updateOption}
                remove={this.removeOption}
            />
        );

        config.push({
            action: 'presskey',
            value: 'a',
        });

        this.setState({ options, config });
    };

    updateOption = (action, index) => {
        const config = this.state.config;
        config[index] = {
            action: action.action,
            value: action.value,
        };
        this.setState({ config });
    };

    removeOption = index => {
        const options = this.state.options;
        const config = this.state.config;

        options[index] = null;
        config[index] = null;

        this.setState({ options, config });
    };

    handleClose = () => {
        this.props.close();
    };

    handleSave = () => {
        this.props.save(this.state.config, this.state.name);
    };

    render() {
        return (
            <Portal>
                <Dialog visible={true} onDismiss={this.handleClose} style={{ elevation: 4, }} >
                    <TextInput label={'Macro Name'} value={this.state.name} onChangeText={this.updateName}/>
                    <ScrollView style={styles.scroll}>
                        {this.state.options}
                    </ScrollView>
                    <Divider/>
                    <Button onPress={this.addOption}>Add Step</Button>
                    <Dialog.Actions>
                        <Button onPress={this.handleClose}>Cancel</Button>
                        <Button onPress={this.handleSave}>Save</Button>
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
