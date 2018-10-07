import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import { FAB } from 'react-native-paper';
import ActionButton from '../../Components/ActionButton';
import CreateMacro from '../../Views/CreateMacro';

type Props = {};
export default class MainButtons extends Component<Props> {
    constructor(props) {
        super(props);

        this.state= {
            open_create: false,
            macros: [
                <ActionButton key={0} value={'enter'}>Enter</ActionButton>,
                <ActionButton key={1} value={'delete'}>Delete</ActionButton>,
                <ActionButton key={2} value={{ button: 0, double: false}} action={'mouseclick'}>Left Mouse Button</ActionButton>,
            ],
        };

        AsyncStorage.getItem('savedmacros').then(list => {
            const newlist = JSON.parse(list).saved;
            const macros = [];
            for(let macro of newlist) {
                macros.push(<ActionButton style={styles.macro} config={macro.config} action={'config'} key={this.state.macros.length + macros.length}>{macro.name}</ActionButton>)
            }
            this.setState({ macros: [...this.state.macros, ...macros] });
        }).catch(() => {
            AsyncStorage.setItem('savedmacros', JSON.stringify({saved: []}))
        })
    };

    openCreateView = () => {
        this.setState({ open_create: true });
    };

    closeCreateView = () => {
        this.setState({ open_create: false });
    };

    saveNewMacro = async (config, name) => {
        const macros = this.state.macros;
        macros.push(
            <ActionButton style={styles.macro} config={config} action={'config'} key={macros.length}>{name}</ActionButton>
        );

        this.setState({ macros, open_create: false });

        AsyncStorage.getItem('savedmacros').then(list => {
            const oldlist = JSON.parse(list);

            const newlist = {
                saved: [...oldlist.saved, { config, name }],
            };
            AsyncStorage.setItem('savedmacros', JSON.stringify(newlist))
        })
    };

    render() {
        const { macros, open_create } = this.state;

        return (
            <View style={styles.back}>
                <ScrollView style={styles.back}>
                    <View style={styles.buttonRow}>
                        { this.state.macros }
                    </View>
                </ScrollView>
                <View style={styles.fab}>
                    <FAB icon={'add'} onPress={this.openCreateView}/>
                </View>
                {open_create ? (
                    <CreateMacro close={this.closeCreateView} save={this.saveNewMacro}/>
                ) : (
                    null
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    back: {
        backgroundColor: '#444',
        flex: 1,
        padding: 5,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    fab: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    macro: {
        backgroundColor: '#4477ff',
    },
});
