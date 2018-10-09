import React, {Component} from 'react';
import Socket from './Modules/Socket';
import { View, StyleSheet, ScrollView, AsyncStorage, Text } from 'react-native';
import {
    DarkTheme,
    Provider as PaperProvider,
    BottomNavigation,
} from 'react-native-paper';
import ActionButton from './Components/ActionButton';
import MainButtons from './Views/MainButtons';
import ConnectToDevice from './Views/ConnectToDevice';
import SocketProvider from './Components/SocketProvider';

const webSocket = new Socket();
const theme = {
    ...DarkTheme,
    /*colors: {
        ...DarkTheme.colors,
        primary: '#4400ff',
        text: '#4400ff',
    },*/
    dark: true,
};

const MainRoute = () => <MainButtons/>;
const CreateRoute = () => <Text>Hi</Text>;

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);

        this.state= {
            index: 0,
            routes: [
                { key: 'main', title: 'Buttons', icon: 'settings-remote' },
                { key: 'create', title: 'Create', icon: 'create' },
            ],
            connected: false,
            webSocket: new Socket(),
        };
    };

    handleIndexChange = index => this.setState({ index });

    renderScene = BottomNavigation.SceneMap({
        main: MainRoute,
        create: CreateRoute,
    });

    handleConnected = () => {
        this.setState({connected: true});
    };

    render() {
        return (
            <PaperProvider theme={theme}>
                <SocketProvider socket={webSocket}>
                    {/*<BottomNavigation
                        navigationState={this.state}
                        onIndexChange={this.handleIndexChange}
                        renderScene={this.renderScene}
                    />*/}
                    {this.state.connected ? (
                        <MainButtons/>
                    ): (
                        <ConnectToDevice connected={this.handleConnected}/>
                    )}
                </SocketProvider>
            </PaperProvider>
        );
    }
}

const styles = StyleSheet.create({
    back: {
        backgroundColor: '#444',
        flex: 1,
        padding: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});
