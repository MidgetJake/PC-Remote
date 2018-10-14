import React, {Component} from 'react';
import Socket from './Modules/Socket';
import { View, StyleSheet, I18nManager, AsyncStorage, Text } from 'react-native';
import {
    DarkTheme,
    DefaultTheme,
    Provider as PaperProvider,
    BottomNavigation,
    Appbar,
    Drawer,
    Portal,
} from 'react-native-paper';
import { createDrawerNavigator } from 'react-navigation';
import ActionButton from './Components/ActionButton';
import MainButtons from './Views/MainButtons';
import ConnectView from './Views/ConnectView';
import ConnectToDevice from './Components/ConnectToDevice';
import SocketProvider from './Components/SocketProvider';
import createReactContext from 'create-react-context';
import DrawerItems from './Components/Drawer';
import RootNavigator from './Navigators/Root';

const PreferencesContext: any = createReactContext();

const NavApp = createDrawerNavigator(
    { Home: { screen: RootNavigator } },
    {
        contentComponent: navigator => (
            <PreferencesContext.Consumer>
                {preferences => (
                    <DrawerItems
                        toggleTheme={preferences.theme}
                        isDarkTheme={preferences.isDarkTheme}
                        navigator={navigator}
                    />
                )}
            </PreferencesContext.Consumer>
        ),
    }
);

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
            menu_open: false,
            theme: DarkTheme,
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

    handleMenuPress = () => {
        this.setState({ menu_open: true })
    };

    handleBackPress = () => {
        this.setState({ menu_open: false})
    };

    savePreferences = async () => {
        try {
            AsyncStorage.setItem(
                'preferences',
                JSON.stringify({
                    theme: this.state.theme === DarkTheme ? 'dark' : 'light',
                    rtl: this.state.rtl,
                })
            );
        } catch (e) {
            // ignore error
        }
    };

    toggleTheme = () =>
        this.setState(
            state => ({
                theme: state.theme === DarkTheme ? DefaultTheme : DarkTheme,
            }),
            this.savePreferences
        );

    render() {
        return (
            <PaperProvider theme={this.state.theme}>
                <SocketProvider socket={webSocket}>
                    {/*<BottomNavigation
                        navigationState={this.state}
                        onIndexChange={this.handleIndexChange}
                        renderScene={this.renderScene}
                    />*/}
                    {/*<Appbar dark>
                        {this.state.menu_open ? (
                            <Appbar.Action icon={'arrow-back'} onPress={this.handleBackPress} />
                        ) : (
                            <Appbar.Action icon={'menu'} onPress={this.handleMenuPress} />
                        )}
                    </Appbar>*/}
                    {/*{this.state.menu_open ? (
                        <Portal>
                            <Drawer.Section title="Some title">
                                <Drawer.Item
                                    label="First Item"
                                    active={true}
                                    onPress={() => console.log('first')}
                                />
                                <Drawer.Item
                                    label="Second Item"
                                    active={false}
                                    onPress={() => console.log('second')}
                                />
                            </Drawer.Section>
                        </Portal>
                    ) : (
                        null
                    )}
                    {this.state.connected ? (
                        <MainButtons/>
                    ): (
                        <ConnectView connected={this.handleConnected}/>
                    )}*/}
                    <PreferencesContext.Provider
                        value={{
                            theme: this.toggleTheme,
                            isDarkTheme: this.state.theme === DarkTheme,
                            navigator: this.props.navigator,
                        }}
                    >
                        <NavApp />
                    </PreferencesContext.Provider>
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
    drawer: {
        position: 'absolute',
        backgroundColor: '#393939'
    },
});
